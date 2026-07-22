# Ophthall Academy SkillConnect 2026 Implementation Plan

## Goal

Create a new interactive SkillConnect page for Ophthall Academy programs, available from a new `SkillConnect` item inside the existing `Programmes` dropdown.

The page should feel different from the existing course pages. It should use a full single-column event layout:

1. Banner
2. About section
3. Why Attend
4. Workshop schedule
5. Interactive workshop details
6. Registration form
7. Payment section with UPI QR code
8. Contact section

Do not use the existing course-page pattern with a left content column and a right sticky register card.

## Existing Site Context

The project is a Vite React app with manual page routing.

Relevant files:

- `src/App.jsx` controls page selection and route rendering.
- `src/components/layout/Navigation.jsx` controls the desktop and mobile dropdown navigation.
- `src/pages/Admissions.jsx` already has a checkbox-style program selection form and can be used as a reference for validation and submission patterns.
- `src/utils/colors.js` and `tailwind.config.js` define the main theme colors.

Theme colors to use:

- Primary navy: `#163A5F`
- Accent orange: `#F47B20`
- Light background: `#F5F7FA`
- Dark navy: `#0F2C4C`
- Main text: `#1e293b`
- Secondary text: `#64748b`

## Recommended Registration Flow

Use the first idea: one complete form on the page.

The form should collect personal details first, then show workshop checkboxes, then calculate the total fee instantly, then show the UPI QR/payment fields, then submit.

This is better than a two-step `Next` flow because:

- The event has only a small number of workshops, so all choices can be understood on one screen.
- Participants can immediately see the fee impact of each selected workshop.
- The payment step depends on the selected fee, so showing the total and QR code in the same form reduces confusion.
- Mobile users can review and edit details without moving between steps.

Optional enhancement: keep a compact `Selected Workshops + Total Fee` summary just below the workshop checkboxes and again above the submit button.

## Files To Add

### 1. `src/pages/SkillConnect.jsx`

Create the new page component here.

Suggested state:

- `selectedWorkshopIds`
- `isAllAccessSelected`
- `totalFee`
- `activeWorkshopId`
- `expandedWorkshopIds` or use a single active accordion
- `isSubmitting`
- form state through `react-hook-form`, matching the existing `Admissions.jsx` approach

Suggested static data arrays:

- `workshops`
- `whyAttendItems`
- `designationOptions`
- `scheduleRows`

Workshop data should include:

- `id`
- `title`
- `subtitle`
- `date`
- `time`
- `fee`
- `tagline`
- `topics`
- `facultyPlaceholder`
- `image`

Initial image placeholders can reuse assets from `public/assets`, for example:

- `/assets/optometry_banner.png`
- `/assets/clinic_optometry.png`
- `/assets/low_vision.png`
- `/assets/orthoptics.png`
- `/assets/placeholder.png`

These can be replaced later with final SkillConnect images.

### 2. UPI QR Code Asset

Add a future placeholder file path such as:

- `public/assets/skillconnect-upi-qr.png`

Until the real QR image is available, use:

- `/assets/placeholder.png`

Add a clear TODO comment in the SkillConnect component near the QR image path.

## Files To Update

### 1. `src/App.jsx`

Import the new page:

```jsx
import SkillConnect from './pages/SkillConnect';
```

Render it:

```jsx
{currentPage === 'skillconnect' && <SkillConnect navigate={navigate} />}
```

### 2. `src/components/layout/Navigation.jsx`

Add a new item inside the `Programmes` dropdown:

```jsx
{ label: 'SkillConnect 2026', value: 'skillconnect' },
```

Recommended placement: at the top of the `Programmes` dropdown because it is an event/program highlight.

### 3. Optional: `src/components/layout/Footer.jsx`

Add `SkillConnect 2026` under useful links or programs if the footer has enough space.

## Page Structure

## 1. Banner

Create a full-width event banner after the fixed navbar offset.

Content:

- `Ophthall Academy SkillConnect 2026`
- `Learn. Practice. Connect.`
- `Hands-on Learning Workshops for Optometrists & Opticians`
- Date: `22-23 August 2026`
- Venue: `Chennai Trade Centre, Nandambakkam, Chennai`
- Note: `Held alongside the India International Optical Expo 2026`

Design:

- Use a navy background with orange accents.
- Include a meaningful image or image placeholder on the banner.
- Use event badges for date, venue, and batch size.
- Primary CTA: `Register Now`, smooth-scrolls to the registration form.
- Secondary CTA: `View Workshops`, smooth-scrolls to workshop section.

## 2. About Section

Single-column section with a strong heading and an image placeholder.

Content should explain:

- SkillConnect is a practical workshop series for Optometrists, Opticians, Vision Therapists, Students, and Eye Care Professionals.
- It focuses on practical learning, live demos, clinical decision-making, and interactive case discussions.
- It helps both students and experienced practitioners.

Interactive idea:

- Add three selectable tabs or segmented buttons:
  - `Hands-on Learning`
  - `Clinical Decisions`
  - `Networking`
- Changing the selected tab updates a short text block and image placeholder.

## 3. Why Attend

Use a responsive grid of compact benefit items:

- Hands-on practical learning
- Live demonstrations
- Case-based discussions
- Small batch learning, only 60 participants per workshop
- Certificate of Participation
- Meet national faculty
- Learn the latest technologies
- Build your professional network

Use Lucide icons if already available through `lucide-react`.

## 4. Workshop Schedule

Display as both:

- A clean desktop table
- A stacked mobile list

Rows:

| Day | Workshop | Time |
| --- | --- | --- |
| 22 Aug | Myopia Masterclass | 10 AM - 1 PM |
| 22 Aug | Selling Skills for Opticians | 12 PM - 2 PM |
| 22 Aug | Practical Low Vision Workshop | 2 PM - 5 PM |
| 23 Aug | Binocular Vision & Orthoptics | 10 AM - 1 PM |
| 23 Aug | Master the Machines | 2 PM - 5 PM |

Add visual labels for date and time conflicts. Workshop 1 and Workshop 2 overlap from 12 PM to 1 PM, so the UI should mention that participants should choose carefully if attending both is not possible.

## 5. Interactive Workshop Details

Use accordion cards or pill filters instead of showing all long content at once.

Recommended interaction:

- Show five workshop summary cards.
- Clicking a card expands its full details below.
- Include a `Select this workshop` button inside each expanded panel that toggles the same selection used in the registration form.

Workshop details:

### Workshop 1: Myopia Masterclass

- Date/time: `22 August, 10 AM - 1 PM`
- Fee: `Rs 500`
- Tagline: `Stop Myopia, Not Just Correct It`
- Topics:
  - Understanding the Myopia Epidemic
  - Axial Length Measurements
  - Corneal Topography
  - Evidence-based Myopia Control
  - Clinical Protocols
  - Case Discussions
  - School Screening Programs
  - Practice Integration
- Faculty placeholder:
  - Name
  - Designation
  - Short Bio
  - Photo

### Workshop 2: Selling Skills for Opticians

- Date/time: `22 August, 12 Noon - 2 PM`
- Fee: `Rs 500`
- Description: `Transform every patient interaction into a delightful experience while ethically increasing optical sales.`
- Topics:
  - Customer Psychology
  - Communication Skills
  - Frame Selection
  - Lens Recommendation
  - Closing Techniques
  - Premium Lens Selling
  - Handling Objections
  - Increasing Patient Satisfaction
- Faculty placeholder

### Workshop 3: Practical Low Vision Workshop

- Title display: `Seeing Beyond 6/60`
- Date/time: `22 August, 2 PM - 5 PM`
- Fee: `Rs 500`
- Tagline: `From Nothing More Can Be Done to We Can Do a Lot.`
- Topics:
  - Low Vision Assessment
  - Device Demonstration
  - Hands-on Practice
  - Case Discussions
  - Rehabilitation
  - Patient Counselling
  - Clinic Setup

### Workshop 4: Binocular Vision & Orthoptics Workshop

- Title display: `Seeing as One`
- Date/time: `23 August, 10 AM - 1 PM`
- Fee: `Rs 500`
- Description: `Walk away with confidence to perform complete binocular vision evaluation and initiate vision therapy.`
- Topics:
  - BV Assessment
  - Cover Tests
  - Accommodation
  - Vergence
  - Vision Therapy
  - Case Discussions
  - Marketing BV Services
- Faculty placeholder

### Workshop 5: Master the Machines

- Subtitle: `Clinical Diagnostics for Optometrists`
- Date/time: `23 August, 2 PM - 5 PM`
- Fee: `Rs 1000`
- Description: `Gain confidence in interpreting modern diagnostic equipment.`
- Topics:
  - Slit Lamp
  - Dry Eye Workup
  - OCT
  - Fundus Camera
  - Visual Fields
  - Tonometry
  - Corneal Diagnostics
  - Clinical Cases
- Faculty placeholder

## 6. Registration Form

Place the form below the workshop section, not in a sticky card.

Personal details:

- Name *
- Gender
- Age
- Mobile Number *
- WhatsApp Number
- Email *
- City
- State
- Institution / Hospital / Optical Store
- Designation
  - Optometrist
  - Optician
  - Ophthalmologist
  - Student
  - Faculty
  - Industry Professional
- Years of Experience

Workshop selection:

- Myopia Masterclass - Rs 500
- Selling Skills for Opticians - Rs 500
- Low Vision Workshop - Rs 500
- Binocular Vision Workshop - Rs 500
- Master the Machines - Rs 1000
- All Access Pass - Rs 2500

Fee behavior:

- Selecting individual workshops adds their fees.
- Selecting `All Access Pass` clears individual selections and sets total to `Rs 2500`.
- Selecting an individual workshop clears `All Access Pass`.
- Display total fee live.
- Optional: show selected workshop count.

Validation:

- Name, mobile number, email, and at least one workshop/pass are required.
- Payment screenshot should be required only after the user has selected a paid option.

## 7. Payment Section

Show this section conditionally after the user selects at least one workshop or the All Access Pass.

Display:

- Total amount
- UPI QR code image
- Transaction ID field
- Upload Payment Screenshot field
- Small note: `Please complete payment before submitting registration.`

Suggested fields:

- `transactionId`
- `paymentScreenshot`

Implementation note:

- If the existing Google Sheets endpoint cannot handle file uploads, use one of these approaches:
  - For the first version, collect all details except screenshot upload and ask users to WhatsApp the screenshot.
  - Or implement a backend/storage flow later for uploading screenshots.

Recommended first version:

- Keep `Transaction ID` required.
- Show QR code.
- Keep screenshot upload visually present, but confirm backend support before making it mandatory.

## 8. Additional Information

Fields:

- Diet Preference
- Emergency Contact
- Need Certificate?
- Any Special Requirements?
- Consent to receive updates from Ophthall Academy

Consent checkbox:

- `Yes, I consent to receive updates from Ophthall Academy.`

## 9. Contact Section

Display at the end of the page:

- Ophthall Academy
- `academy@ophthall.in`
- `info@ophthall.in`
- `Jaanake - +91 94430 13809`
- `www.ophthall.in`

Use simple contact buttons:

- Email
- Call
- Website

## Interactivity Checklist

- Smooth-scroll CTAs from banner to workshops and form.
- About section tabs.
- Workshop accordion or active-card detail display.
- Workshop detail `Select this workshop` button updates registration selections.
- Live total fee calculation.
- Conditional payment section after selection.
- All Access Pass logic.
- Inline validation messages.
- Submitted loading state.
- Success state or navigation to existing `thank-you` page.

## Accessibility And Responsive Requirements

- Use semantic headings in order.
- All form fields need labels.
- Buttons should be keyboard accessible.
- Accordion controls should use `aria-expanded`.
- Mobile layout must be a true single column.
- Avoid sticky side cards.
- Keep text sizes moderate inside form controls and cards.
- Use stable card dimensions where possible so selection states do not shift layout.

## Suggested Implementation Order

1. Create `SkillConnect.jsx` with static page content and data arrays.
2. Add the route in `App.jsx`.
3. Add `SkillConnect 2026` to `Navigation.jsx`.
4. Build banner, about tabs, why-attend grid, schedule, and workshop accordion.
5. Build registration form with checkbox selection and live total.
6. Add conditional payment QR section.
7. Wire submit behavior using the existing admissions form approach or a dedicated new Google Sheets endpoint.
8. Test desktop and mobile responsiveness.
9. Run `npm run build`.

## Open Items Before Final Build

- Confirm final UPI QR image.
- Confirm payment receiver UPI ID/name if it should be displayed beside the QR code.
- Confirm whether an All Access Pass should be exactly `Rs 2500`.
- Confirm whether users are allowed to select Workshop 1 and Workshop 2 despite the time overlap.
- Confirm final faculty names, photos, designations, and short bios.
- Confirm whether registration data should go to the current admissions Google Sheet or a new SkillConnect-specific sheet.

