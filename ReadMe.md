# EcoFinds

**Built for Odoo x NMIT Hackathon 2025** 🌿

EcoFinds is a modern web application designed as an eco-friendly marketplace where users can browse, buy, and sell sustainable products. It features a clean, responsive interface with user authentication, product listings, shopping cart functionality, and user profiles. The app emphasizes ease of use and environmental awareness, helping users discover and promote green alternatives. This project adheres to the hackathon guidelines by using dynamic data sources (extendable to real-time APIs), robust input validation, intuitive navigation, and proper Git version control with collaborative contributions.

## Team

- **voiid (Team Lead)**  
  GitHub: [github.com/official-imvoiid](https://github.com/official-imvoiid)  
  LinkedIn: [linkedin.com/in/voiidnova](https://www.linkedin.com/in/voiidnova)

- **Saim Tabbani**  
  GitHub: [github.com/Saimtabbani](https://github.com/Saimtabbani)  
  LinkedIn: [linkedin.com/in/saim-tabbani-58a73528b](https://www.linkedin.com/in/saim-tabbani-58a73528b)

- **Harsh Pillai**  
  GitHub: [github.com/H822-coder](https://github.com/H822-coder)  
  LinkedIn: [linkedin.com/in/harsh-pillai-77734221a](https://www.linkedin.com/in/harsh-pillai-77734221a)

## Features

- **User Authentication**: Secure login and registration system.
- **Product Browsing**: Explore a catalog of eco-friendly products with search and filtering options.
- **Dashboard**: Personalized overview of user activity, including recent purchases and listings.
- **My Listings**: Allow sellers to create, edit, and manage their product listings.
- **Shopping Cart**: Add items to cart, review, and proceed to checkout.
- **User Profile**: View and update personal information.
- **Purchase History**: Track past orders and transactions.
- **Responsive Design**: Works seamlessly on desktop and mobile devices with a dark/light theme toggle.

## Tech Stack

- **Frontend**: React 19 with Vite for fast development and bundling.
- **Routing**: React Router DOM for single-page application navigation.
- **Styling**: Custom CSS with system fonts and smooth transitions.
- **Linting**: ESLint for code quality and React hooks enforcement.
- **Other**: Browser-based, no backend included (extendable with APIs for real data). Planned for local database integration (e.g., IndexedDB for offline support).

## Installation

1. **Clone the Repository**:
   ```
   git clone https://github.com/official-imvoiid/EcoFinds.git
   cd EcoFinds
   ```

2. **Install Dependencies**:
   Ensure you have Node.js (v18+) installed. Then run:
   ```
   npm install
   ```

3. **Run the Development Server**:
   ```
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

4. **Build for Production**:
   ```
   npm run build
   ```
   The output will be in the `dist` folder. Serve it with any static server.

5. **Lint the Code**:
   ```
   npm run lint
   ```

## Usage

- Navigate to `/` to browse products.
- Use `/auth` for login/register.
- Access `/dashboard` for your overview.
- Sell items via `/listings`.
- Manage cart at `/cart`.
- View profile at `/profile` and purchases at `/purchases`.

## Project Structure

```
EcoFinds/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Auth.jsx
│   │   ├── BrowseProducts.jsx
│   │   ├── Cart.jsx
│   │   ├── CreateListing.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditListingModal.jsx
│   │   ├── Header.jsx
│   │   ├── MyListings.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   ├── Profile.jsx
│   │   ├── Purchases.jsx
│   │   └── server.jsx  (backend integration)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. (Add a LICENSE file if not present.)

## Acknowledgments

- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/).
- Icons and assets from open sources.
- Shoutout to the Odoo x NMIT Hackathon 2025 organizers and team collaborators!

*EcoFinds: Find, Buy, Sustain.* 🌿