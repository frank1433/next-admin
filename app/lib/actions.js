"use server"
import { revalidatePath } from "next/cache"
import { Product, User } from "./models"
import { connectToDB } from "./utils"
import { redirect } from "next/navigation"
import bcrypt from 'bcrypt'
import { signIn } from "../auth"

export const addUser = async (formData) =>{
    const {username, email, password, phone, address, isAdmin, isActive}= Object.fromEntries(formData)
    try {
        connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
    } catch (error) {
        console.log(error)
        throw new Error("Failed to create new user")
    }
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
}

export const updateUser = async (formData) =>{
    const {id, username, email, password, phone, address, isAdmin, isActive}= Object.fromEntries(formData)
    try {
        connectToDB();
        const updateFields = {
            username, email, password, phone, address, isAdmin, isActive
        }
        Object.keys(updateFields).forEach(
            (key) => (updateFields[key]===""|| undefined) && delete updateFields[key]
        )
        await User.findByIdAndUpdate(id, updateFields)
    } catch (error) {
        console.log(error)
        throw new Error("Failed to update user")
    }
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
}

export const addProduct = async (formData) =>{

    const {title, desc, price, stock, color, size }= Object.fromEntries(formData)
   
    try {
        connectToDB();

    const newProduct = new Product({
        title, desc, price, stock, color, size
    });

    await newProduct.save();
    } catch (error) {
        console.log(error)
        throw new Error("Failed to create new product")
    }
    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
}

export const updateProduct = async (formData) =>{
    const {id, title, desc, price, stock, color, size }= Object.fromEntries(formData)
    try {
        connectToDB();
        const updateFields = {
            title, desc, price, stock, color, size 
        }
        Object.keys(updateFields).forEach(
            (key) => (updateFields[key]===""|| undefined) && delete updateFields[key]
        )
        await Product.findByIdAndUpdate(id, updateFields)
    } catch (error) {
        throw new Error("Failed to update product")
    }
    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
}
export const deleteProduct = async (formData) =>{

    const {id }= Object.fromEntries(formData)
   
    try {
        connectToDB();
    await Product.findByIdAndDelete(id);
    } catch (error) {
        console.log(error)
        throw new Error("Failed to delete a product")
    }
    revalidatePath("/dashboard/products")
}

export const deleteUser = async (formData) =>{

    const {id }= Object.fromEntries(formData)
   
    try {
        connectToDB();
    await User.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Failed to delete a user")
    }
    revalidatePath("/dashboard/users")
}

export const fetchUser = async (id) =>{
    try {
        connectToDB();

    const user = await User.findById(id);
    return user
    
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch a user")
    }
    // revalidatePath(`/dashboard/user/${id}`)
}

export const fetchProduct = async (id) =>{
    try {
        connectToDB();

    const product = await Product.findById(id);
    return product
    
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch a product")
    }
}

export const authenticate = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);
  
    try {
      await signIn("credentials", { username, password });
    } catch (err) {
      if (err.message.includes("CredentialsSignin")) {
        return "Wrong Credentials";
      }
      throw err;
    }
  };