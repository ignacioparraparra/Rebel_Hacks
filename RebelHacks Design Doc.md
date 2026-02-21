# RebelHacks Design Doc
Theme: Las Vegas

# ScholarChips
DESCRIPTION/ELEVATOR PITCH: ScholarChips is a website designed to gamify school attendance. Teachers are able to upload attendance sheets and award students who are present with virutal currency called 'chips'. Chips can be exchanged 
for select prizes in their school's Prize Shop! There's also the Mystery Prize Wheel, a minigame where students can chance a small number of tokens for any of the shop's prizes, regardless of price.

## Project Story
# Inspiration
The theme of Las Vegas is broad, with many aiming to tackle its fields of gaming, tourism, and hospitality. Our team wanted to solve a problem that dealt more with Las Vegas's locals and how we could improve the quality of life for our community. As college students--and having experienced K-12 schooling in Nevada--supporting education for CCSD students is a personal mission, especially when they make up the 5th largest school district in the nation and top largest in NV.

# What it does

# How we built it

# Challenges

# Accomplishments
- functional database for student and teacher accounts
- currency system

# What we learned
Programming Takeaways:
- working on a single project as a team
- maintanenance

Business Takeaways:
- time-management 

# What's next for ScholarChips?


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

- Login
- Logout

## Leaderboard

- School Leaderboard  
- Class Leaderboard

## Available Prizes

## Resources for Dignity
- Ingests student school, points them to map
- Salvation Army/Goodwill
- 

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

