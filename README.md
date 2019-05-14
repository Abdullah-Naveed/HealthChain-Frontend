# HealthChain-Frontend

Frontend for Final Year Project - Health Chain

Health Chain is an Electronic Health Record (EHR) system which uses blockchain technology to store medical records in a transparent, tamper-proof and trustworthy fashion. The medical records are based on Patient and GP interactions. To ensure the records are kept safe, the records are encrypted using an encryption service before they are stored. To give control to the patient, there is a trust mechanism in place which only allows trusted GP’s to view a patients medical records.

## Getting Started

### Digital wallet (Blockchain) set up:

- Install the metamask extension into your browser following instructions from https://www.metamask.io
- Select the option of entering your own seed words
- Enter in the following 12 words to load the account: bounce payment sound original arrest stairs ecology vacant prosper broken appear spice
- Select the Ropsten Test Network from the dropdown

### Front-end Application set up:

- Open the HealthChain-Frontend application using an IDE such as Webstorm
- Make sure you have Node installed
- Run ‘npm install’ in the terminal to install any dependencies 
- Run ‘gulp dev’ to run the web application
- Once the application is running, you have to first register a GP
- Once the GP is registered, you can create patients and then use the other services of the system such as creating medical  records or retrieving medical records
