"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/utils/auth";

export default function SignUpPage(){

    const router = useRouter();

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [city,setCity]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState<"talent"|"seeker">("talent");

    function handleSignup(e:React.FormEvent){

        e.preventDefault();

        registerUser({

            id:Date.now().toString(),

            name,

            email,

            phone,

            city,

            password,

            role

        });

        alert("Account Created Successfully!");

        router.push("/login");

    }

    return(

<div className="auth-page">

<div className="auth-card">

<h1>Create Account</h1>

<p className="auth-subtitle">
Join India's Premium Casting Platform
</p>

<form onSubmit={handleSignup}>

<label>Full Name</label>

<input
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

<label>Email</label>

<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<label>Phone</label>

<input
value={phone}
onChange={(e)=>setPhone(e.target.value)}
required
/>

<label>City</label>

<input
value={city}
onChange={(e)=>setCity(e.target.value)}
required
/>

<label>Password</label>

<input
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<label>Role</label>

<select
value={role}
onChange={(e)=>setRole(e.target.value as "talent"|"seeker")}
>

<option value="talent">
Talent
</option>

<option value="seeker">
Casting Director / Seeker
</option>

</select>

<button className="signup-btn-full">

Create Account

</button>

</form>

<p className="bottom-text">

Already have an account?

<Link href="/login">

Log In

</Link>

</p>

</div>

</div>

    );

}