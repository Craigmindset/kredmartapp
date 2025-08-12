"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";

export default function ReturnPolicyPage() {
  const router = useRouter();
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 relative">
      <button
        aria-label="Close"
        onClick={() => router.back()}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <MdClose size={22} className="text-gray-500 hover:text-gray-700" />
      </button>
      <h1 className="text-3xl font-bold mb-4">Return Policy</h1>
      <p className="mb-2">
        We want you to be completely satisfied with your purchase. If you are
        not satisfied, you may return most items within 7 days of delivery for a
        full refund or exchange, subject to the following conditions:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Items must be unused and in the same condition that you received them.
        </li>
        <li>Items must be in the original packaging.</li>
        <li>Proof of purchase is required for all returns.</li>
        <li>Some items may be non-returnable (see product details).</li>
      </ul>
      <p className="mb-2">
        To initiate a return, please contact our support team with your order
        details. We will provide instructions for shipping the item back to us.
      </p>
      <p>
        If you have any questions about our return policy, please contact us at
        support@kredmart.com.
      </p>
    </div>
  );
}
