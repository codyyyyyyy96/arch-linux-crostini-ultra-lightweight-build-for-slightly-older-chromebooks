import React from 'react';
import { CommandBlock } from './CommandBlock';

const ragExampleFile = `Project Dragon:
- Status: In-progress
- Key Tech: Rust, WebAssembly
- Next Step: Finalize the auth module.
`;

export const LocalAiView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Understanding Your AI Setup</h2>
        <p className="text-gray-400 mb-4">
          To achieve a powerful, free, and completely offline AI assistant, we will use two key open-source tools together:
        </p>
        <ul className="list-disc list-inside text-gray-400 mb-4 pl-4 space-y-2">
            <li><strong className="text-gray-200">Ollama:</strong> This is the <strong className="text-amber-300">engine</strong>. It runs the large language models (like Llama 3) on your computer. Without it, the assistant has no "brain".</li>
            <li><strong className="text-gray-200">Sidekick:</strong> This is your <strong className="text-cyan-300">assistant interface</strong>. It's the command-line tool you'll use to chat, ask coding questions, and analyze files. It sends your requests to the Ollama engine.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-200 mb-2">Step 1: Install the Ollama Engine</h3>
        <p className="text-gray-400 mb-4">
          First, we install Ollama, which will manage and run the AI models locally.
        </p>
        <CommandBlock content="curl -fsSL https://ollama.com/install.sh | sh" />
        <p className="text-gray-400 my-4">
          Next, enable and start the Ollama background service so it's always ready.
        </p>
        <CommandBlock content="sudo systemctl enable --now ollama.service" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-200 mb-2">Step 2: Install the Sidekick Assistant</h3>
        <p className="text-gray-400 mb-4">
          Now, install the <code className="bg-gray-700 px-1 rounded">sidekick-cli</code> tool using Python's package manager, pip.
        </p>
        <CommandBlock content="pip install sidekick-cli" />
      </div>
       <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Step 3: Using Your AI Assistant</h2>
        <p className="text-gray-400 mb-4">
          Your local AI setup is complete! Here is how to use it.
        </p>
        <h4 className="text-lg font-bold text-gray-300 mb-2">A. Start an AI Model</h4>
        <p className="text-gray-400 mb-4">
          Before you can chat, you need to tell Ollama to run a model. Let's use Llama 3. The first time you run this, it will download the model file (this can take a while). Run this in your terminal:
        </p>
        <CommandBlock content="ollama run llama3" />
        <p className="text-gray-400 my-4">
          Once the model is running, you can either chat with it directly in this terminal, or <strong className="text-gray-200">leave it running and open a new terminal tab (using tmux)</strong> to use Sidekick.
        </p>

        <h4 className="text-lg font-bold text-gray-300 mt-6 mb-2">B. Chat & Ask Coding Questions</h4>
         <p className="text-gray-400 mb-4">
          In a new terminal, you can now use Sidekick. It will automatically connect to the running Ollama model.
        </p>
        <CommandBlock content={`sidekick chat "write a python function that reverses a string"`} />

        <h4 className="text-lg font-bold text-gray-300 mt-6 mb-2">C. Give it Memory (RAG)</h4>
        <p className="text-gray-400 mb-4">
          This is how you make your assistant "learn" from your files. By providing a file as context, you can ask questions about it. This is called Retrieval-Augmented Generation (RAG).
        </p>
        <p className="text-gray-400 mb-4">
          First, create a sample notes file:
        </p>
        <CommandBlock content={`echo "${ragExampleFile}" > my_project_notes.txt`} />
        <p className="text-gray-400 my-4">
          Now, use the <code className="bg-gray-700 px-1 rounded">-f</code> flag to pass the file to Sidekick and ask a question about it.
        </p>
        <CommandBlock content={`sidekick chat -f my_project_notes.txt "What is the next step for Project Dragon?"`} />
        <p className="text-gray-400 my-4">
          The AI will read the file and answer based on its contents. You can use this for your code, documentation, or any text file!
        </p>
      </div>
    </div>
  );
};