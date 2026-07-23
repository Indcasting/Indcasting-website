"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/utils/auth";
import { useRouter } from "next/navigation";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export default function NotificationsPage() {

  const router = useRouter();

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id:1,
      title:"Welcome to IndCasting!",
      description:"Your account has been created successfully.",
      time:"Just Now",
      read:false
    },
    {
      id:2,
      title:"New Casting Call",
      description:"A Fashion Shoot has been posted near you.",
      time:"10 minutes ago",
      read:false
    },
    {
      id:3,
      title:"Membership",
      description:"Upgrade to Premium for unlimited applications.",
      time:"Yesterday",
      read:true
    }
  ]);

  useEffect(()=>{

    const user=getCurrentUser();

    if(!user){

      router.push("/login");

      return;

    }

  },[]);

  function markAllRead(){

    const updated=notifications.map(notification=>({

      ...notification,

      read:true

    }));

    setNotifications(updated);

  }

  return(

<div className="notification-page">

<div className="notification-container">

<div className="notification-header">

<h1>Notifications</h1>

<button onClick={markAllRead}>

Mark All Read

</button>

</div>

{
notifications.map(notification=>(

<div

key={notification.id}

className={`notification-card ${notification.read ? "read" : ""}`}

>

<h3>{notification.title}</h3>

<p>{notification.description}</p>

<span>{notification.time}</span>

</div>

))
}

</div>

</div>

  );

}