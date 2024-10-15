// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { useUpdateUserMutation } from "../slices/usersApiSlice";
// import { setCredentials } from "../slices/authSlice";
// import Loader from "../components/Loader";
// import Authbtn from "../components/AuthBtn";

// const ProfileScreen = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const dispatch = useDispatch();

//   const { userInfo } = useSelector((state) => state.auth);

//   const [updateProfile, { isLoading }] = useUpdateUserMutation();

//   useEffect(() => {
//     setName(userInfo.name);
//     setEmail(userInfo.email);
//   }, [userInfo.email, userInfo.name]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//     } else {
//       try {
//         const res = await updateProfile({
//           _id: userInfo._id,
//           name,
//           email,
//           password,
//         }).unwrap();
//         console.log(res);
//         dispatch(setCredentials(res));
//         toast.success("Profile updated successfully");
//       } catch (err) {
//         toast.error(err?.data?.message || err.error);
//       }
//     }
//   };

//   return (
//     <>
//       <Authbtn />
//       <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
//         <h1 className="text-2xl font-semibold text-center mb-4">
//           Update Profile
//         </h1>

//         <form onSubmit={submitHandler}>
//           <div className="my-4">
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               placeholder="Enter name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="my-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="my-4">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="my-4">
//             <label
//               htmlFor="confirmPassword"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               placeholder="Confirm password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
//           >
//             Update
//           </button>

//           {isLoading && <Loader />}
//         </form>
//       </div>
//     </>
//   );
// };

// export default ProfileScreen;
