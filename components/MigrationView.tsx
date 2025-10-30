import React from 'react';
import { CommandBlock } from './CommandBlock';

const createUserScript = `
# Create a user, add them to the 'wheel' group for sudo access
useradd -m -g users -G wheel yourusername

# Set a password for the new user (it will prompt you)
passwd yourusername

# Install sudo
pacman -S sudo

# Allow users in the 'wheel' group to use sudo
# This opens the sudoers file; find and uncomment the line:
# %wheel ALL=(ALL:ALL) ALL
EDITOR=nano visudo
`;

export const MigrationView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-red-400 mb-2">Important Prerequisite: The `crosh` Terminal</h2>
        <p className="text-gray-400 mb-4">
          These steps must be performed in ChromeOS's built-in shell, called <code className="bg-gray-700 px-1 rounded">crosh</code>. You can access it by pressing <strong className="text-gray-200">Ctrl+Alt+T</strong>. The standard Linux Terminal app will not work for this process.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-2">Step 1: Enter the Termina VM</h3>
        <p className="text-gray-400 mb-4">
          Crostini containers run inside a virtual machine named `termina`. First, start it and then open a shell inside it.
        </p>
        <CommandBlock content="vmc start termina" />
        <p className="text-gray-400 my-4">After that command finishes, run:</p>
        <CommandBlock content="vsh termina" />
         <p className="text-gray-400 my-4">Your command prompt will change to <code className="bg-gray-700 px-1 rounded">(termina) ~ $</code>. All subsequent commands in this guide are run from this prompt.</p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-red-400 mb-2">Step 2: DANGER ZONE - Delete the Old Container</h3>
        <p className="text-gray-400 mb-4">
          This is a destructive step and will <strong className="text-red-300">permanently delete your existing Lubuntu container and all its files</strong>. Make sure you have backed up any important data from your Linux files to Google Drive or an external drive.
        </p>
        <p className="text-gray-400 mb-4">
          The default container is named `penguin`. Stop and delete it with the following commands:
        </p>
        <CommandBlock content="lxc stop penguin --force" />
        <CommandBlock content="lxc delete penguin" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-2">Step 3: Launch Arch Linux Container</h3>
        <p className="text-gray-400 mb-4">
          Now, launch a new Arch Linux container. We will name it `penguin` so that ChromeOS integrates it correctly. This will download the latest official Arch Linux image.
        </p>
        <CommandBlock content="lxc launch images:archlinux/current penguin" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-2">Step 4: Initial Arch Linux Configuration</h3>
        <p className="text-gray-400 mb-4">
          Arch Linux starts as a bare-bones system, so we need to enter it and perform some initial setup, like creating your user account.
        </p>
         <CommandBlock content="lxc exec penguin -- /bin/bash" />
        <p className="text-gray-400 my-4">
          Your prompt will now be a root shell inside the new Arch container. First, initialize the package manager's keyring:
        </p>
        <CommandBlock content="pacman-key --init && pacman-key --populate archlinux" />
        <p className="text-gray-400 my-4">Now, create your user account. Replace `yourusername` with your desired username.</p>
        <CommandBlock content={createUserScript} />
      </div>

      <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-2">Step 5: All Done!</h3>
        <p className="text-gray-400 mb-4">
          You can now close the `crosh` terminal window. Open the standard "Terminal" app from your ChromeOS launcher. You will be logged into your new, minimal Arch Linux environment as the user you just created.
        </p>
        <p className="text-gray-400">You are ready to proceed to the <strong className="text-gray-200">System Setup</strong> section of this guide!</p>
      </div>
    </div>
  );
};
