import { BsBatteryCharging, BsWallet2 } from "react-icons/bs";

const headerMenu = [
    {
        title: "Recharge",
        icon: BsBatteryCharging,
        href: "team"
    },
    {
        title: "Withdraw",
        icon: BsWallet2,
        href: "invite"
    },
]


export default function CompanyAbout(props) {
    return <div
        style={{
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "5px",
            margin: "0 1rem",
        }}
    >
        <p
            style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "1.1rem"
            }}
        >About Our Comapany</p>
        <p style={{
            fontSize: "0.9rem"
        }}>
            
            To improve this prompt for the Cursor IDE, I'll enhance the language and structure, converting it into a clear, English-language project brief. This format is ideal for AI-assisted development, as it breaks down the project into logical components that a developer or an AI tool can follow.

***
<br/>
### **Project Brief: Digital Product Marketplace Backend**
<br/>
<br/>
This document outlines the requirements for a backend application for a digital product marketplace. The application will be built using **Node.js with ES modules (modulejs)** and **MongoDB** as the database.
<br/>
---

### **1. Core Functionalities**
<br/>
* **User Management:**
    * **Registration & Login:** Users will register and log in using their **phone number** instead of an email address. A user's full name is required during registration, and they must provide a valid 6-digit referral code to complete the process.
    * **User Profiles:** Users can view their profile, which includes their name and contact information. They can also update their name and change their password.
    * **Referral System:** Each user is assigned a unique, 6-digit referral code and a corresponding referral link upon registration.
<br/>
<br/>
* **Wallet & Finance:**
    * **User Wallet:** Each new user starts with a digital wallet with an initial balance of **0 credits**.
    * **Referral Rewards:** When a new user places their first order, the user who referred them automatically receives **20 credits** in their wallet.
    * **Bank Details:** Users can submit and edit their bank details, including the bank name, account holder name, account number, and IFSC code.
<br/><br/>

* **Product & Orders:**
    * **Digital Products:** A product must have the following fields: `productImage` (URL), `productName`, `price`, `perDayEarning`, `productValidity` (in days), `totalEarnPrice` (a calculated field: `perDayEarning` * `productValidity`), and `productDescription`.
    * **Order Creation:** Users can place an order for a digital product if they have sufficient credits in their wallet. The product is "held" for the `productValidity` duration, and during this time, the `perDayEarning` amount is credited to the user's wallet daily.
<br/><br/>
* **Transactions:**
    * **Deposits & Withdrawals:** Users can deposit and withdraw credits from their wallet. All deposit and withdrawal requests require **admin approval**. Each request must have a unique transaction ID.
    * **Withdrawal Middleware:** A pre-check (middleware) must be in place to ensure a user has submitted their bank details before they can submit a withdrawal request.

---
<br/><br/>
### **2. User & Admin Views**

* **User Analytics:** Users can access a dashboard to view their personal analytics, including a history of their orders, referrals, total earnings, and daily earnings.
<br/>
* **Admin Dashboard:** The administrator has a dedicated area to:
    * View, update, delete, or create user accounts.
    * View all orders and application-wide analytics.
    * Manage products (create, update, delete).
    * Approve or reject deposit and withdrawal requests.
<br/><br/>
* **Default Admin:** The application must be initialized with a default admin user. This user should also have a referral code. </p>
    </div>

}