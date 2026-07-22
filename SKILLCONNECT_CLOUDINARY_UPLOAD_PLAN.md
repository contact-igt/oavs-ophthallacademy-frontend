# SkillConnect Cloudinary Payment Screenshot Upload Plan

## Goal

Upload the payment screenshot directly from the SkillConnect registration form to Cloudinary, receive a secure image URL, and send that URL to Google Apps Script / Google Sheet with the rest of the form data.

Current flow:

1. User selects payment screenshot.
2. Browser previews image using `FileReader`.
3. Form sends screenshot Base64 to Google Apps Script.

Recommended new flow:

1. User selects payment screenshot.
2. Browser previews image using `FileReader`.
3. On submit, upload the selected image file directly to Cloudinary using an unsigned upload preset.
4. Cloudinary returns `secure_url`, `public_id`, format, bytes, etc.
5. Send only the Cloudinary URL and metadata to Google Apps Script.
6. Google Sheet stores the Cloudinary URL and can display the image using `=IMAGE(url)`.

## Why This Is The Right Method Without Backend

Because this project does not have a backend, do not use signed uploads. Signed uploads require an API secret, and Cloudinary explicitly says the API secret must never be exposed in browser code.

Use Cloudinary unsigned uploads instead:

- Create an unsigned upload preset in Cloudinary Console.
- Restrict the preset for safety.
- Upload from frontend using `fetch` and `FormData`.
- Send the returned `secure_url` to Google Sheets.

Official Cloudinary references:

- Upload API reference: https://cloudinary.com/documentation/image_upload_api_reference
- Client-side uploading: https://cloudinary.com/documentation/client_side_uploading
- Upload presets: https://cloudinary.com/documentation/upload_presets

## Cloudinary Setup

Create one upload preset for SkillConnect payment screenshots.

Recommended settings:

- Preset name: `skillconnect_payment_screenshots`
- Signing mode: unsigned
- Resource type: image
- Folder / asset folder: `ophthall/skillconnect/payments`
- Allowed formats: `jpg`, `jpeg`, `png`, `webp`
- Max file size: keep around `2 MB` to match frontend validation
- Access mode: public, if Google Sheet should display the image directly
- Optional tags: `skillconnect`, `payment-screenshot`, `ophthall`

Important:

- `cloud_name` and unsigned `upload_preset` will be visible in frontend code. That is expected for unsigned uploads.
- Do not put `api_key`, `api_secret`, or signed upload logic in frontend code.
- If the preset is abused, create a new preset name and delete the old one.

## Environment Variables

Add these values in the Vite environment file.

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=skillconnect_payment_screenshots
```

Use `import.meta.env` in React.

## Frontend Upload Helper

Add a helper in `src/pages/SkillConnect.jsx` or move it to a utility file later.

```js
const uploadPaymentScreenshotToCloudinary = async (file) => {
  if (!file) return null;

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary configuration is missing.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'ophthall/skillconnect/payments');
  formData.append('tags', 'skillconnect,payment-screenshot,ophthall');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error?.message || 'Payment screenshot upload failed.');
  }

  return {
    url: result.secure_url,
    publicId: result.public_id,
    format: result.format,
    bytes: result.bytes,
    width: result.width,
    height: result.height,
    originalFilename: result.original_filename,
  };
};
```

## Keep FileReader For Preview

Keep the existing FileReader logic only for showing preview in the form.

Use FileReader for:

- Preview before submit
- Validating selected file type
- Validating selected file size

Do not send Base64 to Google Sheets after Cloudinary is connected, unless you want a fallback.

## Submit Flow Change

Current submit uses:

```js
const screenshotFile = data.paymentScreenshot?.[0];
```

New submit flow:

```js
const screenshotFile = data.paymentScreenshot?.[0];
const uploadedScreenshot = screenshotFile
  ? await uploadPaymentScreenshotToCloudinary(screenshotFile)
  : null;
```

Then add Cloudinary fields into payload:

```js
const payload = {
  sheetName: 'Skill Connect',
  source_form: 'SkillConnect 2026 Registration',

  name: data.name?.trim(),
  gender: data.gender || '',
  age: data.age || '',
  phone: data.mobile?.trim(),
  whatsapp: data.whatsapp?.trim() || '',
  email: data.email?.trim(),
  city: data.city?.trim() || '',
  state: data.state?.trim() || '',
  institution: data.institution?.trim() || '',
  designation: data.designation || '',
  years_of_experience: data.experience || '',

  program: selectedLabels.join(', '),
  selected_workshops: selectedLabels.join(', '),
  total_fee: totalFee,
  all_access_original_total: isAllAccessSelected ? allWorkshopsTotal : '',
  all_access_discount: isAllAccessSelected ? allAccessSavings : '',

  transaction_id: data.transactionId?.trim(),
  payment_screenshot_name: screenshotFile?.name || '',
  payment_screenshot_url: uploadedScreenshot?.url || '',
  payment_screenshot_public_id: uploadedScreenshot?.publicId || '',
  payment_screenshot_format: uploadedScreenshot?.format || '',
  payment_screenshot_size: uploadedScreenshot?.bytes || '',

  diet_preference: data.dietPreference || '',
  emergency_contact: data.emergencyContact?.trim() || '',
  need_certificate: data.needCertificate || '',
  special_requirements: data.specialRequirements?.trim() || '',
  consent_updates: data.consentUpdates ? 'Yes' : 'No',
  ip_address: ipAddress,
  utm_source: localStorage.getItem('utm_source') || 'direct',
  timestamp: new Date().toISOString(),
};
```

Remove these fields after Cloudinary is working:

```js
payment_screenshot_data_url
payment_screenshot_base64
payment_screenshot_mime_type
```

They are no longer needed because the image is hosted on Cloudinary.

## Google Apps Script Append Row

SkillConnect append row should store the Cloudinary URL.

```js
if (data.sheetName === 'Skill Connect') {
  const sheet = ss.getSheetByName('Skill Connect');

  const imageFormula = data.payment_screenshot_url
    ? '=IMAGE("' + data.payment_screenshot_url + '")'
    : '';

  sheet.appendRow([
    data.timestamp || '',
    data.name || '',
    data.gender || '',
    data.age || '',
    data.phone || '',
    data.whatsapp || '',
    data.email || '',
    data.city || '',
    data.state || '',
    data.institution || '',
    data.designation || '',
    data.years_of_experience || '',
    data.selected_workshops || '',
    data.total_fee || '',
    data.all_access_original_total || '',
    data.all_access_discount || '',
    data.transaction_id || '',
    data.payment_screenshot_name || '',
    data.payment_screenshot_url || '',
    imageFormula,
    data.payment_screenshot_public_id || '',
    data.payment_screenshot_format || '',
    data.payment_screenshot_size || '',
    data.diet_preference || '',
    data.emergency_contact || '',
    data.need_certificate || '',
    data.special_requirements || '',
    data.consent_updates || '',
    data.utm_source || '',
    data.ip_address || ''
  ]);
}
```

## Recommended Google Sheet Headers

Use this order for the `Skill Connect` sheet:

```js
[
  'Timestamp',
  'Name',
  'Gender',
  'Age',
  'Mobile Number',
  'WhatsApp Number',
  'Email',
  'City',
  'State',
  'Institution',
  'Designation',
  'Years of Experience',
  'Selected Workshops',
  'Total Fee',
  'All Access Original Total',
  'All Access Discount',
  'Transaction ID',
  'Payment Screenshot Name',
  'Payment Screenshot URL',
  'Payment Screenshot Preview',
  'Cloudinary Public ID',
  'Screenshot Format',
  'Screenshot Size',
  'Diet Preference',
  'Emergency Contact',
  'Need Certificate',
  'Special Requirements',
  'Consent Updates',
  'UTM Source',
  'IP Address'
]
```

## UI Behavior

When user selects image:

- Show image preview immediately using FileReader.
- Show selected filename.
- Keep validation: image only and max 2 MB.

When user submits:

- Disable submit button.
- Show text like `Uploading payment screenshot...` or `Submitting registration...`.
- Upload image to Cloudinary first.
- If Cloudinary upload fails, stop submission and show error.
- If Cloudinary upload succeeds, submit registration payload to Google Apps Script.

## Error Handling

Recommended cases:

- Missing Cloudinary env values: show `Payment screenshot upload is not configured.`
- Invalid file type: show `Please upload JPG, PNG, or WEBP image.`
- File too large: show `Please upload an image below 2 MB.`
- Cloudinary upload failed: show `Payment screenshot upload failed. Please try again.`
- Google Sheet submit failed: show `Registration submission failed. Please try again.`

## Security Notes

Unsigned upload is acceptable for this no-backend form, but keep it restricted:

- Use a dedicated preset only for SkillConnect payment screenshots.
- Restrict allowed formats.
- Restrict file size.
- Store uploads in a dedicated folder.
- Add moderation/manual review if needed.
- Do not expose API secret.
- Rotate the unsigned upload preset if abuse occurs.

## Implementation Checklist

1. Create unsigned Cloudinary upload preset.
2. Add `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET`.
3. Add `uploadPaymentScreenshotToCloudinary(file)` helper.
4. Keep FileReader preview logic for UI only.
5. On submit, upload screenshot to Cloudinary before sending Google Sheet payload.
6. Replace Base64 payload fields with Cloudinary URL fields.
7. Update Apps Script append row to include `payment_screenshot_url` and `=IMAGE(url)`.
8. Test with JPG, PNG, large file rejection, no file, and slow network.
9. Confirm Google Sheet displays the screenshot preview.
