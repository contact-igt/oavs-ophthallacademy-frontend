import React from 'react';
import { CheckCircle } from 'lucide-react';

const CheckItem = ({ text }) => (
    <div className="flex items-start gap-3 mb-3">
        <CheckCircle className="text-[#F47B20] flex-shrink-0 mt-1" size={20} />
        <span className="text-gray-700">{text}</span>
    </div>
);

export default CheckItem;
