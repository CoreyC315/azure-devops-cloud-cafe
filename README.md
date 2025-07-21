# azure-devops-cloud-cafe
A scalable coffee order management app deployed on Azure Kubernetes Service.

## Table of Contents

- [Project Title and Description](#project-title-and-description-)
- [Technologies Used](#technologies-used-)
    ## Technologies Used

* **Node.js**: JavaScript runtime for server-side development.
* **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
* **Git**: Version control system.
* **GitHub**: Cloud-based hosting for Git repositories.
* **VS Code**: Integrated Development Environment (IDE).
* **npm**: Node.js package manager.
- [Getting Started (Local Development)](#getting-started-local-development-)
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

    
  - [Prerequisites](#prerequisites)
  - [Project Setup](#project-setup)
  - [Running the Application Locally](#running-the-application-locally)
  - [Testing Endpoints](#testing-endpoints)
- [Next Steps (Cloud Deployment)](#next-steps-cloud-deployment-)
