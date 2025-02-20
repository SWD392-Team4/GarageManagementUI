import React from 'react'

export default function ChangePassWord() {
    return (
        <>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
            <div className="space-y-4">
                <input type="password" placeholder="Current Password" className="w-full p-2 border rounded-lg" />
                <input type="password" placeholder="New Password" className="w-full p-2 border rounded-lg" />
                <input type="password" placeholder="Confirm Password" className="w-full p-2 border rounded-lg" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                    Confirm Password
                </button>
            </div>
            <hr className='mt-5 border-spacing-4 border-black' />

        </>
    )
}
