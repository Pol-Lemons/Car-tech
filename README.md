CarTech

A responsive used-car ownership cost estimator built with React and TypeScript.

CarTech helps drivers look beyond a vehicle's listing price and estimate the broader monthly cost of ownership. Users can search for vehicles, choose a trim, enter ownership details, review an estimated cost breakdown, and compare up to three cars side by side.

[!NOTE]
CarTech currently uses rule-based calculations rather than live market data or a trained machine-learning model. All results are estimates and should not be treated as dealer quotes, insurance quotes, or financial advice.

Features

Search vehicles by make, model, or year

Filter the catalog by manufacturer

Select from available trims

Estimate a used vehicle's value from its age, mileage, and condition

Calculate estimated monthly payment, fuel, insurance, and maintenance costs

View a detailed monthly ownership-cost breakdown

Compare up to three vehicles

Switch between responsive grid and list layouts

How the estimator works

CarTech begins with a vehicle's original trim price and adjusts it using the information provided by the user.

Estimate

Main inputs

Used-car value

Original trim price, model year, mileage, and condition

Monthly payment

Estimated vehicle value and financing inputs

Fuel cost

Vehicle and driving assumptions

Insurance

Rule-based insurance assumptions

Maintenance

Rule-based maintenance assumptions

Total monthly cost

Payment, fuel, insurance, and maintenance estimates

The current formulas are intended for exploration and comparison. Future versions may use expanded vehicle data, external services, and machine-learning models to improve accuracy.

Tech stack

React 18

TypeScript

Vite 6

Tailwind CSS 4

Material UI and Radix UI components

Lucide React icons

Motion for interface animations

Getting started

Prerequisites

Install a current version of Node.js and npm.

Installation

git clone https://github.com/Pol-Lemons/Car-tech.git
cd Car-tech
npm install
npm run dev

Open the local address displayed by Vite in your terminal.

Production build

npm run build

The optimized build will be generated in the dist directory.

Project status

CarTech is under active development. The current version is a front-end prototype with rule-based estimates.

Roadmap

Expand the number of supported makes, models, and trims

Add model-year-specific specifications

Separate and improve the vehicle dataset

Add a backend API and persistent database

Integrate more realistic pricing and ownership-cost data

Develop and evaluate a machine-learning price-prediction model

Contributing

Contributions and suggestions are welcome. To propose a change:

Fork the repository.

Create a feature branch.

Make and test your changes.

Open a pull request describing what you changed and why.

Attributions

This project includes components from shadcn/ui under the MIT License and photographs from Unsplash under the Unsplash License. See ATTRIBUTIONS.md for details.

Built as an exploration of vehicle pricing, ownership costs, and modern front-end development.
