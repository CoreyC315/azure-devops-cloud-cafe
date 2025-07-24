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
```
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






Phase 2: Containerization with Docker 🐳
This phase packages the Cloud Café application and its dependencies into a portable Docker image, ensuring consistent execution across different environments.

Dockerfile Explained
The Dockerfile defines the steps to build the application's container image using a multi-stage approach for efficiency:

Dockerfile

# Stage 1: Build (for installing dependencies)
FROM node:18-alpine AS builder # Uses a lightweight Node.js base image for building
WORKDIR /app                    # Sets the working directory inside the container
COPY package*.json ./           # Copies package files for dependency caching
RUN npm install --omit=dev      # Installs only production dependencies

# Stage 2: Run (for the final application image)
FROM node:18-alpine             # Uses a smaller base image for the final runtime
WORKDIR /app                    # Sets the working directory
COPY --from=builder /app/node_modules ./node_modules # Copies installed modules from builder stage
# Copy the rest of your application code (app.js, public/, etc.)
COPY . .
EXPOSE 3000                     # Declares that the container listens on port 3000
CMD ["node", "app.js"]          # Specifies the command to run the application
Building the Docker Image
Ensure Docker Desktop is running on your machine. From the root of your project directory, execute the following command to build the Docker image:

Bash

docker build -t cloud-cafe-app:latest .
docker build: Initiates the image build process.

-t cloud-cafe-app:latest: Tags the image with the name cloud-cafe-app and version latest.

.: Specifies that the Dockerfile is in the current directory.

Testing the Docker Image Locally
After a successful build, you can run a container from your newly created image and test the application locally:

Bash

docker run -p 3000:3000 cloud-cafe-app:latest
docker run: Creates and starts a container from the specified image.

-p 3000:3000: Maps port 3000 on your host machine to port 3000 inside the container, allowing external access.

cloud-cafe-app:latest: Specifies the Docker image to use.

Phase 3: Push to Azure Container Registry (ACR) ☁️
This phase involves creating a private Docker registry in Azure and pushing the containerized Cloud Café application image to it, making it accessible for deployment to Azure services like AKS.

Creating Azure Container Registry
The Azure Container Registry was created via the Azure Portal:

Log in to Azure Portal (portal.azure.com).

Search for and navigate to "Container Registries".

Click "+ Create" and fill in the following details:

Resource Group: CloudCafeRG (or create new).

Registry name: A globally unique name (e.g., cloudcaferegistrycorey).

Location: Your chosen Azure region (e.g., East US).

SKU: Basic.

After creation, navigate to the ACR resource in the portal. Under "Settings", go to "Access keys" and toggle "Admin user" to Enabled. Note down the Login server, Username, and Password.

Logging In and Tagging
From your local machine, authenticate Docker with your ACR and tag your local image for the registry:

Login to ACR from Docker:

Bash

docker login <ACR_LOGIN_SERVER>
(Use the Username and Password obtained from ACR Access keys in the portal).
Alternatively, use az acr login --name <your_acr_name> if Azure CLI is logged in.

Tag the local Docker image:

Bash

docker tag cloud-cafe-app:latest <ACR_LOGIN_SERVER>/cloud-cafe-app:latest
(Replace <ACR_LOGIN_SERVER> with your actual ACR login server, e.g., cloudcaferegistrycorey.azurecr.io).

Pushing the Image
Push the tagged Docker image to your Azure Container Registry:

Bash

docker push <ACR_LOGIN_SERVER>/cloud-cafe-app:latest
You can verify the image's presence by navigating to your ACR resource in the Azure Portal and checking the "Repositories" blade.

Open your web browser and navigate to http://localhost:3000/. You should see your Cloud Café frontend, demonstrating the app running successfully within its Docker container. To stop the container, press Ctrl+C in the terminal where it's running.


Phase 4: Deploy to Azure Kubernetes Service (AKS) 🚀 (Updated)
This phase guides you through creating your AKS cluster, connecting to it, defining how your application runs in Kubernetes, and finally deploying it for public access.

Scaling Up the AKS Cluster
To manage costs, the AKS cluster nodes can be scaled down when not in use. Before deployment, ensure the cluster is scaled up to at least one node.

Start/Scale Up the Cluster:

Bash

az aks scale --resource-group CloudCafeRG --name <YOUR_AKS_CLUSTER_NAME> --node-count 1
Replace <YOUR_AKS_CLUSTER_NAME> with your actual AKS cluster name.

Verify Cluster Status:
Once the scale operation is complete, verify the node(s) are ready:

Bash

az aks get-credentials --resource-group CloudCafeRG --name <YOUR_AKS_CLUSTER_NAME>
kubectl get nodes
Confirm that at least one node shows a Ready status.

Connect to Your AKS Cluster (from your Local Machine)
Once your AKS cluster deployment is complete, you need to configure kubectl on your local machine to interact with it.

Open your VS Code terminal.

Log in to Azure CLI if you're not already:

Bash

az login
Get the credentials for your AKS cluster. Replace <YOUR_AKS_CLUSTER_NAME> with the actual name you used (e.g., cloud-cafe-aks-cluster):

Bash

az aks get-credentials --resource-group CloudCafeRG --name <YOUR_AKS_CLUSTER_NAME>
This command updates your local kubectl configuration to point to your new AKS cluster.

Verify Connection:
Test if kubectl can connect and list your node(s):

Bash

kubectl get nodes
You should see your node(s) listed with a Ready status.

Define Kubernetes Deployment and Service YAMLs
You'll create the Kubernetes manifest files (.yaml files) that tell AKS how to deploy and expose your application. These files should be in the root of your azure-devops-cloud-cafe project.

Create deployment.yaml:
This file describes how to run your application's containers.

YAML

apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloud-cafe-app-deployment
  labels:
    app: cloud-cafe
spec:
  replicas: 1 # We'll start with 1 replica; we can scale this later
  selector:
    matchLabels:
      app: cloud-cafe
  template:
    metadata:
      labels:
        app: cloud-cafe
    spec:
      containers:
      - name: cloud-cafe-app
        image: <ACR_LOGIN_SERVER>/cloud-cafe-app:latest # IMPORTANT: Replace with your actual ACR login server
        ports:
        - containerPort: 3000
Remember to replace <ACR_LOGIN_SERVER> with the actual login server name of your ACR (e.g., cloudcaferegistrycorey.azurecr.io).

Create service.yaml:
This file defines how to expose your application to the internet.

YAML

apiVersion: v1
kind: Service
metadata:
  name: cloud-cafe-app-service
spec:
  type: LoadBalancer # This tells Azure to create a public Azure Load Balancer
  selector:
    app: cloud-cafe
  ports:
    - protocol: TCP
      port: 80     # The external port the service will listen on (standard HTTP)
      targetPort: 3000 # The internal port the container is listening on (from your Dockerfile)
Deploy to AKS
Now, apply these Kubernetes manifest files to your AKS cluster.

Apply the Deployment:
In your VS Code terminal (ensure you are in your project's root directory: azure-devops-cloud-cafe):

Bash

kubectl apply -f deployment.yaml
Apply the Service:

Bash

kubectl apply -f service.yaml
It might take a few minutes for Azure to provision the Load Balancer and assign a public IP address.

Get the Application's Public IP and Access it
You can check the status of your service and get its external IP address:

Bash

kubectl get service cloud-cafe-app-service
Keep running this command every 30 seconds or so. Look for the EXTERNAL-IP column. It will initially show <pending>. Once a public IP address appears, copy it.

Finally, open your web browser and navigate to:

http://<EXTERNAL_IP_ADDRESS>

You should now see your "Cloud Café" application running live from Azure Kubernetes Service!


Phase 4: Deploy to Azure Kubernetes Service (AKS)
This phase involved several critical steps:

Creating the Azure Kubernetes Service (AKS) Cluster:

What it is: AKS is Azure's managed Kubernetes service. It abstracts away the complexity of managing the underlying infrastructure (like virtual machines, networking, and storage), allowing you to focus on deploying your applications.

How we did it: You used the Azure Portal to provision a new AKS cluster. Key configurations included:

Resource Group: Placing it in CloudCafeRG to keep related resources organized.

Region: Selecting East US to match your ACR for better performance and reduced egress costs.

Node Pool Configuration: This was a significant part of the process due to subscription quotas.

Initially, you faced issues with default node sizes (Standard_D4ds_v4 then Standard_DS2_v3) exceeding your subscription's vCPU quota.

You successfully navigated this by selecting a smaller, allowed VM size like Standard_A2_v2 (2 vCPUs) and setting the node count to 1 to stay within your subscription limits.

Networking: You set the network configuration to Kubenet for simplicity and integrated the cluster with your cloudcaferegistrycorey ACR. This integration is vital as it allows AKS to pull your private Docker images without additional authentication steps.

Monitoring: You enabled Container Insights (Azure Monitor) for the cluster, which will provide valuable performance and health data later.

Purpose: The AKS cluster provides the environment where your application's containers will run and be orchestrated.

Connecting to Your AKS Cluster from Your Local Machine:

What it is: To manage your AKS cluster from your local development environment, you need kubectl, the Kubernetes command-line tool.

How we did it:

You used the Azure CLI command az aks get-credentials --resource-group CloudCafeRG --name cloud-cafe-aks-cluster.

This command downloads the necessary configuration and sets up your local kubectl context to point to your new AKS cluster.

You resolved an az login error (indicating incorrect credentials or tenant context) to ensure the CLI could properly access your subscription and cluster.

Purpose: This step establishes the secure communication channel between your local machine and the AKS control plane, allowing you to deploy and manage applications.

Defining Kubernetes Deployment and Service YAMLs:

What they are: These are plain text files (.yaml format) that describe the desired state of your application within the Kubernetes cluster.

deployment.yaml:

You created this file to define your cloud-cafe-app-deployment.

It specifies that Kubernetes should run your cloud-cafe-app container.

Crucially, the image: field points to the exact location of your Docker image in ACR: cloudcaferegistrycorey.azurecr.io/cloud-cafe-app:latest.

It defines replicas: 1, meaning one instance (pod) of your application should be running.

Purpose: The Deployment ensures your application pods are running, healthy, and maintain the desired number of replicas.

service.yaml:

You created this file to define your cloud-cafe-app-service.

It specifies type: LoadBalancer, which tells Azure to automatically provision a public IP address and an Azure Load Balancer.

It maps external port 80 (standard HTTP) to internal container port 3000 (where your Node.js app listens).

Purpose: The Service provides a stable network endpoint for your application, allowing external traffic to reach it and load-balancing requests across multiple pods if you were to scale up.

Deploying to AKS:

How we did it: You used kubectl apply -f deployment.yaml and kubectl apply -f service.yaml to send these configurations to your AKS cluster.

You encountered and resolved an ImagePullBackOff error, which meant Kubernetes couldn't pull your Docker image from ACR. This was resolved by ensuring the exact image name in deployment.yaml matched what was in ACR (cloud-cafe-app:latest instead of cloud-cafe-a:latest), and potentially refreshing the ACR-AKS integration.

Purpose: These commands instruct Kubernetes to create and manage the defined resources, pulling your application's image from ACR and starting your application.

Getting the Application's Public IP and Accessing It:

How we did it: You ran kubectl get service cloud-cafe-app-service and waited for an EXTERNAL-IP to appear.

Once the IP was available (e.g., 134.33.211.107), you opened it in your web browser.

The Result: Your "Cloud Café" application successfully loaded and was fully functional, running live in Azure Kubernetes Service.

Purpose: This final step confirms that your application is deployed, running, and publicly accessible from anywhere on the internet.

In summary, you've taken your self-contained Dockerized application, created a cloud environment for it in AKS, told Kubernetes how to run and expose it, and successfully launched it to the internet! This is the core workflow for deploying containerized applications to Kubernetes in Azure.






