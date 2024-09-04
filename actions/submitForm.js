"use server";

export default async function submitForm(formData){
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    console.log(email, password, confirmPassword);
}