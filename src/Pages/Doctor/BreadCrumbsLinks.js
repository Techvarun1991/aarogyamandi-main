export const homeBreadcrumb = [{ label: "Home", url: "/" }];
export const findDoctors = [{ label: "Find-Doctors", url: "/doctor/bycity" }];
export const doctorConsulatation = [
  ...homeBreadcrumb,
  ...findDoctors,
  { label: "Doctor consultation", url: "/searchdoctor" },
];
export const getDoctorConsultationSpl = (dynamicData) => [
  ...homeBreadcrumb,
  ...findDoctors,
  { label: `${dynamicData}`, url: `/doctor/bycity/` }, // Use dynamic data
];


export const doctorSearchByCity = [
  ...homeBreadcrumb,
  ...findDoctors,
  { label: "Search by speciality", url: "/doctor/bycity" },
];

export const medicinesBreadcrumb = [
  ...homeBreadcrumb,
  { label: "Medicines", url: "/medicine" },
];

export const contactus = [
  ...homeBreadcrumb,
  { label: "Contact Us", url: "/contactus" },
];

export const aboutus = [
  ...homeBreadcrumb,
  { label: "About Us", url: "/aboutus" },
];

export const register = [
  ...homeBreadcrumb,
  { label: "Register", url: "/register" },
];

export const login = [...homeBreadcrumb, { label: "Login", url: "/signin" }];

export const blogs = [...homeBreadcrumb, { label: "Blogs", url: "/blognew" }];

export const resetPassword = [
  ...homeBreadcrumb,
  { label: "Reset Password", url: "/reset-password" },
];

export const forgetPassword = [
  ...homeBreadcrumb,
  { label: "Forget Password", url: "/forget-password" },
];
