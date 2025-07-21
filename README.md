# Cloud Café: Scalable Order Management with Azure Kubernetes Service

This project aims to build a highly available and scalable coffee order management web application, "Cloud Café," and deploy it using Azure Kubernetes Service (AKS). It demonstrates key cloud engineering and DevOps principles, including containerization, local development, version control, and preparing for cloud deployment.

## Table of Contents

- [Project Title and Description](#project-title-and-description-)
- [Technologies Used](#technologies-used-)
- [Getting Started (Local Development)](#getting-started-local-development-)
  - [Prerequisites](#prerequisites)
  - [Project Setup](#project-setup)
  - [Running the Application Locally](#running-the-application-locally)
  - [Testing Endpoints](#testing-endpoints)
- [Next Steps (Cloud Deployment)](#next-steps-cloud-deployment-)


## Technologies Used

* **Node.js**: JavaScript runtime for server-side development.
* **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
* **Git**: Version control system.
* **GitHub**: Cloud-based hosting for Git repositories.
* **VS Code**: Integrated Development Environment (IDE).
* **npm**: Node.js package manager.

## Getting Started (Local Development)

This section guides you through setting up and running the Cloud Café application on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js**: [Download & Install Node.js](https://nodejs.org/en/download/) (includes npm).
* **Git**: [Download & Install Git](https://git-scm.com/downloads).
* **Visual Studio Code (VS Code)**: [Download & Install VS Code](https://code.visualstudio.com/download).

### Project Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/CoreyC315/azure-devops-cloud-cafe.git](https://github.com/CoreyC315/azure-devops-cloud-cafe.git)
    cd azure-devops-cloud-cafe
    ```

2.  **Install Dependencies:**
    Navigate to the project directory and install the required Node.js packages:
    ```bash
    npm install
    ```

3.  **PowerShell Execution Policy (Windows Users):**
    If you encounter errors related to script execution, you might need to adjust your PowerShell execution policy. Open PowerShell **as Administrator** and run:
    ```powershell
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```
    Confirm with 'Y'. This allows locally created scripts to run.

### Running the Application Locally

Start the Node.js Express server:

```bash
node app.js

The application will be accessible at http://localhost:3000. You will see console output confirming the port and endpoints.

Testing Endpoints
Once the application is running, open your web browser and navigate to:

http://localhost:3000/

You should see the interactive "Cloud Café" frontend page. From this interface, you can:

View the menu, which is dynamically loaded from the /menu API endpoint.

Select a coffee and quantity to place an order, which sends a POST request to the /order API endpoint.

Enter an Order ID to check its status, which queries the /status/:id API endpoint.

(Optional: You can still test the backend API endpoints directly if needed, e.g., using curl for the POST request, but the frontend provides a complete user experience.)

Next Steps (Cloud Deployment) ☁️
The next phases of this project will focus on deploying and managing the Cloud Café application in Azure:

Containerization with Docker

Pushing to Azure Container Registry (ACR)

Deploying to Azure Kubernetes Service (AKS)

Implementing Autoscaling

Setting up Monitoring with Azure Monitor

Simulating Production Traffic
