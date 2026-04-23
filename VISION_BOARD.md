# 🌟 Vision Board: The "Known" Social Pivot

This document outlines the strategic pivot from a private contact manager to a **Social Networking & Discovery Platform**—a hybrid of **WhatsApp** (personal networking) and **Reddit** (community discovery).

---

## 🚀 The Core Concept: "WhatsApp meets Reddit"
Transforming static contact lists into a dynamic ecosystem where people join communities to explore and connect with like-minded individuals.

---

## 🏗️ Phase 1: The "Known Card" (Public Profiles)
Before people can explore each other, they need a "Public Identity."
- **Feature:** A toggle in settings to make a profile "Public."
- **Content:** Bio, Skill Tags (#React, #Design), Social Links, and a "Vouch" count.
- **Goal:** Every user has a beautiful digital business card that others can discover.

---

## 🏘️ Phase 2: Public Communities (The Reddit Part)
Moving from private groups to open communities.
- **Public Groups:** Anyone can search and find these groups (e.g., "MERN Developers," "Indie Hackers Delhi").
- **Follow/Join Button:** Users can "Follow" a group to see its member directory and have it appear in their sidebar.
- **Group Profiles:** Groups have descriptions, rules, and "Vibes" (tags).

---

## 🔍 Phase 3: The Discovery Engine
A way to find people and groups.
- **Explore Wall:** A feed showing "Trending Groups" and "Featured Profiles."
- **Smart Search:** Search by skill, interest, or location.
- **Mutual Connections:** "You and Rahul are both in the 'React India' group."

---

## 🤝 Phase 4: Networking Actions (The WhatsApp Part)
Once you find someone in a group, what do you do?
- **"Add to My Contacts":** Instantly save a public profile to your private contacts.
- **Vouching:** Leave a "Trusted" badge on profiles of people you've worked with.
- **Direct Connect:** Quick links to start a conversation on WhatsApp or LinkedIn.

---

## 🛠️ Technical Roadmap (Future Work)
1.  **Backend Changes:**
    *   Update `User` model with `isPublic`, `bio`, and `tags`.
    *   Update `Group` model with `isPublic`, `description`, and `members: [UserIDs]`.
2.  **Frontend Views:**
    *   `DiscoverView.jsx`: The main hub for finding groups and people.
    *   `PublicProfileView.jsx`: A high-end presentation of a user's Known Card.
3.  **Real-time (Optional):**
    *   Socket.io for "Who's Online" or simple community pings.

---
*This vision was captured on April 24, 2026. Ready to build when you are!*
