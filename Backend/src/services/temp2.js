// {
//     matchScore: 88,
//     title: 'Software Development Engineer Intern Interview Report: Pranjal Mathur',
//     technicalQuestions: [        
//       {
//         question: 'Explain the difference between a `Stack` and a `Queue` data structure and provide a real-world use case for each.',
//         intention: 'To assess foundational knowledge of Data Structures and Algorithms.',      
//         answer: "A Stack is a LIFO (Last-In, First-Out) data structure, like a pile of plates, where the last item added is the first one to be removed. A real-world use case is the 'undo' functionality in software or browser history. A Queue is a FIFO (First-In, First-Out) data structure, like a line of people, where the first item added is the first one to be removed. A real-world use case is a printer queue or message buffering systems."
//       },
//       {
//         question: "Describe the concept of 'state' and 'props' in React.js. When would you use one over the other?",
//         intention: 'To evaluate understanding of core React concepts.',
//         answer: "'State' is an object that holds data or information about the component that may change over time. It's internal to the component and managed by it. 'Props' (short for properties) are used to pass data from a parent component to a child component. They are immutable within the child component. You would use state for data that changes within a component (e.g., user input, toggle status), and props for data that needs to be communicated down the component tree or configuration passed to a reusable component."
//       },
//       {
//         question: 'How do you handle asynchronous operations in Node.js? Provide an example using Promises or async/await.',  
//         intention: "To assess understanding of Node.js's asynchronous nature.",
//         answer: "Node.js is single-threaded and uses an event loop to handle asynchronous operations, preventing blocking. Common methods include callbacks, Promises, and async/await. Using async/await is a modern, cleaner way: `async function fetchData() { try { let response = await fetch('https://api.example.com/data'); let data = await response.json(); console.log(data); } catch (error) { console.error('Error:', error); } }` This makes asynchronous code look synchronous and is easier to read and debug than nested callbacks."
//       },
//       {
//         question: 'Explain what makes MongoDB a NoSQL database and when you might choose it over a relational database like MySQL.',
//         intention: 'To test knowledge of database types and their appropriate use cases.',     
//         answer: "MongoDB is a NoSQL, document-oriented database. It stores data in flexible, JSON-like documents, meaning the schema can evolve easily. You might choose MongoDB over a relational database like MySQL when dealing with large volumes of unstructured or semi-structured data, requiring high scalability (horizontal scaling is easier), fast iterative development, or when your data model is less rigid and doesn't require complex joins or transactions that are fundamental to ACID compliance in SQL databases. Examples include content management systems, IoT data, or real-time analytics."
//       },
//       {
//         question: 'What are the key principles of a RESTful API? Can you give an example of a common HTTP method and its use?',
//         intention: 'To assess understanding of API design and web communication protocols.',   
//         answer: 'Key principles of a RESTful API include: Client-Server architecture (separation of concerns), Statelessness (each request from client to server must contain all information needed), Cacheability (responses can be cached), and a Uniform Interface (consistent way of interacting with resources). A common HTTP method is GET, used for retrieving resources. For example, a GET request to `/api/products/123` would retrieve the details of the product with ID 123.'
//       }
//     ],
//     behavioralQuestions: [       
//       {
//         question: 'Tell me about a challenging technical problem you encountered in one of your projects and how you approached solving it.',
//         intention: 'To evaluate problem-solving skills, resilience, and debugging approach.',  
//         answer: 'I will describe a specific instance using the STAR method: detailing the Situation, the Task I faced, the Actions I took (e.g., debugging steps, research, collaboration), and the Result or what I learned from it. I will highlight my analytical thinking and perseverance.'
//       },
//       {
//         question: 'Describe a time when you had to collaborate with others on a project. What was your role, and how did you ensure effective teamwork?',    
//         intention: 'To assess collaboration, communication, and teamwork skills.',
//         answer: 'I will use the STAR method to describe my experience during the Resume Analyzer or Web Development Intern project. I will explain my specific responsibilities, how I communicated with team members (e.g., daily stand-ups, code reviews), resolved conflicts, and contributed to the overall success of the project.'
//       },
//       {
//         question: 'What excites you most about this Software Development Engineer Intern role, and how do you see yourself contributing?',
//         intention: 'To gauge enthusiasm, alignment with the role, and self-awareness of contributions.',
//         answer: 'I am most excited about the opportunity to develop scalable web applications using the MERN stack and contribute to real-world products. My experience with React, Node.js, Express, and MongoDB, combined with strong DSA skills, will allow me to quickly contribute to building responsive UIs, designing REST APIs, and writing clean, testable code. I am eager to learn from experienced engineers and enhance my backend development and system design skills.'
//       },
//       {
//         question: 'Tell me about a time you received constructive feedback. How did you react to it, and what did you do with that feedback?',
//         intention: 'To assess coachability, growth mindset, and ability to act on feedback.',  
//         answer: 'I will describe a situation where I received feedback (e.g., during code review at my internship or a project). I will explain that I reacted positively, understood the reasoning behind the feedback, and describe the specific steps I took to implement the suggested improvements, demonstrating my commitment to continuous learning and growth.'
//       }
//     ],
//     skillGaps: [
//       { skill: 'TypeScript', severity: 'medium' },
//       { skill: 'AWS/GCP', severity: 'medium' },
//       { skill: 'Docker', severity: 'medium' },
//       { skill: 'CI/CD Pipelines', severity: 'medium' }
//     ],
//     preparationPlan: [
//       {
//         day: 1,
//         focus: 'Data Structures & Algorithms / Core JavaScript',
//         tasks: [Array]
//       },
//       {
//         day: 2,
//         focus: 'React.js & Frontend Architecture',
//         tasks: [Array]
//       },
//       {
//         day: 3,
//         focus: 'Backend Development & Database Design',
//         tasks: [Array]
//       },
//       {
//         day: 4,
//         focus: 'System Design Basics & Cloud Technologies',     
//         tasks: [Array]
//       },
//       { day: 5, focus: 'Behavioral & Project Deep Dive', tasks: [Array] }
//     ]
//   }

