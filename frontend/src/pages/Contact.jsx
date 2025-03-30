import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
    return (
        <div>
            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>
                    CONTACT{" "}
                    <span className="text-gray-700 font-semibold">US</span>
                </p>
            </div>

            <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
                <img
                    className="w-full md:max-w-[360px]"
                    src={assets.contact_image}
                    alt="About Image"
                />
                <div className="flex flex-col justify-center items-start gap-6">
                    <h4 className="text-lg font-semibold text-gray-700">
                        OUR OFFICE
                    </h4>
                    <p className="text-gray-500">
                        00000 Willms Station <br />
                        Suite 000, Washington, USA
                    </p>
                    <p className="text-gray-500">
                        Tel: +84 123456789 <br /> Email:
                        richardnguyen26th8@gmail.com
                    </p>
                    <h4 className="text-lg font-semibold text-gray-700">
                        CAREERS AT PRESCRIPTO
                    </h4>
                    <p className="text-gray-500">
                        Learn more about our teams and job openings.
                    </p>
                    <button className="px-8 py-4 border border-black hover:bg-black hover:text-white transition-all duration-500">
                        Explore Jobs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Contact;
