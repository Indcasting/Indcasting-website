"use client";

export default function DashboardCards() {

    const cards = [

        {
            title:"Active Castings",
            value:"12",
            icon:"🎬"
        },

        {
            title:"Applicants",
            value:"148",
            icon:"👥"
        },

        {
            title:"Profile Views",
            value:"3.2K",
            icon:"👀"
        },

        {
            title:"Premium Reach",
            value:"96%",
            icon:"⭐"
        }

    ];

    return(

        <section className="dashboard-cards">

            {cards.map((card,index)=>(

                <div
                    className="dashboard-card"
                    key={index}
                >

                    <span>{card.icon}</span>

                    <h2>{card.value}</h2>

                    <p>{card.title}</p>

                </div>

            ))}

        </section>

    );

}