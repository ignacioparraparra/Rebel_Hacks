# RebelHacks Design Doc

# schoolChips

Theme: Las Vegas

WHY: Student Absentism is a big problem in Las Vegas due to a variety of at home issues. We propose an application to provide incentives to students to attend school and reward them with meal vouchers (fighting student hunger) and school merchandise (providing students with clean clothing). 

HOW: Students earn chips by attending school

TECH STACK:  
- NODEJS   
- REACT
- HTML CSS   
- POSTGRES SQL

# PAGES:

## Dashboard

Stats  
\- Available Chips  
\- Chips earned  
\- Class Rank  
\- Prizes

##  Games

- Spin the Wheel  
- Mystery Box  
- Optional:  
  - Horse Racing  
  - Class-wide skill-based games

## Login

-   
- Logout

## Leaderboard

- School Leaderboard  
- Class Leaderboard

## Available Prizes

# Features

Teacher creates course

- Requires class roster  
- Creates student accounts based on roster  
  - Returns list of student accounts with default creds, initialize in db

Student and Teacher Login

- Accounts  
  - Teacher  
    - Good Behavior / Attendance / Miscellaneous  
      - Good Behavior \= x coins  
      - Attendance \= y coins  
      - Misc \= z coins  
    - enroll students into a class  
  - Student  
    - play games  
    - win prizes

Game Functionality

- Play game, deduct chips from db, return prize

# Timeline

