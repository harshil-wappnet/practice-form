import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
const Forms = () => {
    const [image, setImage] = useState(null)
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phone_pattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const pincode_pattern = /^\d{6}$/;
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            gender: "",
            dob: "",
            email: "",
            password: "",
            cnfpassword: "",
            contactnumber: "",
            address: "",
            state: "",
            pincode: "",
            hobbies: "",
            photo: null,
        },
        validationSchema: yup.object({
            firstname: yup.string().required("First name is required").min(3, "At least 3 characters").max(20, "At max 20 character allowed"),
            lastname: yup.string().required("Last name is required").min(3, "At least 3 characters").max(20, "At max 20 character allowed"),
            age: yup.number().required("Age is required").min(18),
            email: yup.string().email("Invalid Email").required("Email is required"),
            password: yup.string().min(8, "Minimum 8 characters required").max(16, "Maximum 16 characters required").required("Password is required").matches(password_pattern, "Valid the password"),
            cnfpassword: yup.string().required("Confirm Password is required").oneOf([yup.ref('password'), null], 'Passwords must match').matches(password_pattern, "Valid the password"),
            contactnumber: yup.string().required("Contact Number is required").matches(phone_pattern, "Phone number format is invalid."),
            pincode: yup.string().max(6, "Not more than 6 allowed").matches(pincode_pattern, "Matche the pincode pattern correctly"),
            photo: yup.mixed().required("Upload image"),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });
    const changeimage = (e) => {
        const file = URL.createObjectURL(e.target.files[0]);
        setImage(file);
    }
    return (
        <>
            <h1 style={{ color: "red" }}>Student Registration Form</h1>
            <form onSubmit={formik.handleSubmit}>
                {/* First Name */}
                <label htmlFor="firstname">First Name : </label>
                <input
                    type="text"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {formik.touched.firstname && formik.errors.firstname ? (<div>{formik.errors.firstname}</div>) : null}<br /><br />
                {/* Last Name */}
                <label htmlFor="lastname">Last Name : </label>
                <input
                    type="text"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {formik.touched.lastname && formik.errors.lastname ? (<div>{formik.errors.lastname}</div>) : null}<br /><br />

                {/* Age */}
                <label htmlFor="age">Age : </label>
                <input
                    type="number"
                    name="age"
                    value={formik.values.age || 18}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {formik.touched.age && formik.errors.age ? (<div>{formik.errors.age}</div>) : null}<br /><br />
                {/* DOB */}
                <label htmlFor="dob">Date of Birth : </label>
                <input
                    type="date"
                    name="dob"
                    value={formik.values.dob}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {formik.touched.dob && formik.errors.dob ? (<div>{formik.errors.dob}</div>) : null}<br /><br />
                {/* Email */}
                <label htmlFor="email">Email : </label>
                <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null}<br /><br />
                {/* Password */}
                <label htmlFor="password">Password : </label>
                <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}<br /><br />
                {/* Confirm Password */}
                <label htmlFor="cnfpassword">Confirm Password : </label>
                <input
                    type="password"
                    name="cnfpassword"
                    value={formik.values.cnfpassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {formik.touched.cnfpassword && formik.errors.cnfpassword ? (<div>{formik.errors.cnfpassword}</div>) : null}<br /><br />
                {/* Contact Number */}
                <label htmlFor="contactnumber">Phone Number : </label>
                <input
                    type="text"
                    name="contactnumber"
                    value={formik.values.contactnumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {formik.touched.contactnumber && formik.errors.contactnumber ? (<div>{formik.errors.contactnumber}</div>) : null}<br /><br />
                {/* PinCode */}
                <label htmlFor="pincode">Pin Code : </label>
                <input
                    type="text"
                    name="pincode"
                    value={formik.values.pincode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {formik.touched.pincode && formik.errors.pincode ? (<div>{formik.errors.pincode}</div>) : null}<br /><br />
                {/* Photo Upload */}
                <label htmlFor="photo">Upload Photo : </label>
                <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    value={formik.values.photo}
                    onChange={changeimage}
                    onBlur={formik.handleBlur} />
                {formik.touched.photo && formik.errors.photo ? (<div>{formik.errors.photo}</div>) : null}<br /><br />

                <img
                    src={image}
                    style={{ width: "80px", height: "60px" }}
                    alt="Preview your file"
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Forms;