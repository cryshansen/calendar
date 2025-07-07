# App 2   📸 Calendar Event Booking App — Project Overview
# 📸 Studio Booking System — Multi-App Overview

This project consists of multiple AngularJS + Java web apps under development to build a full-featured Photo Studio Booking Platform.

The apps were designed to be modular, each handling a different part of the user experience (listing, booking, scheduling), simulating what it would be like as a team of integration sharing components in local development
3 Apps being considered for integration: 

App 1 Studio listings and call to action/ views of studios costs etc
App 2 Calendar Event  App - handles login calendar view passing a studio id in url saves to calendar rest of front end is NOT connected to back end. 
App 3 CalendarStudioApp -- the app that integrates it all. 
 

# 🧾 Description

Handles calendar-based selection of time slots for bookings. Uses FullCalendar library.
Handles login calendar view passing a studio id in url saves to calendar rest of front end is NOT connected to back end. 
This is a legacy Java web application built using: AngularJS (1.x) for the frontend (client-side routing)

Spring Framework + Hibernate for backend logic and database interaction

JSP pages for partial views rendered dynamically

Tomcat as the application server

MySQL (via MAMP) as the relational database
The database is called `calendarApp` and engages with one table the `CalendarEvents` table and returns booked slots. 

The application provides a calendar landing to book studio spaces in time blocks, and proceed through a checkout flow. 

This calendar project builds a booking system for booking rooms as any rental type requiring a calendar interface.
This could include salons/photographers/massage therapy or other types 
Dependancy is on `FullCalendar.js` which requires upgrades to the new file format (requires to upgrade 5+)
Future integrate with Google calendar as an alternative
