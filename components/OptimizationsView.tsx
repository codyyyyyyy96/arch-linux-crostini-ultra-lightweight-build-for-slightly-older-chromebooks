import React from 'react';
import { CommandBlock } from './CommandBlock';

const zramConfigContent = `[zram0]
# Use 75% of RAM for the ZRAM device.
zram-fraction = 0.75

# Set a ceiling of 4GB for the device size.
# This prevents it from growing too large on systems with more RAM.
max-zram-size = 4096
`;

const sysctlConfigContent = `# Lower swappiness to prefer using RAM over swapping.
# A value of 10 is a good balance for a desktop system.
vm.swappiness = 10

# Reduce the tendency of the kernel to reclaim memory used for caching
# directory and inode objects. This can improve filesystem performance.
vm.vfs_cache_pressure = 50
`;

export const OptimizationsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">ZRAM Swap Configuration</h2>
        <p className="text-gray-400 mb-4">
          ZRAM creates a compressed block device in your RAM that acts as a swap disk. On systems with limited RAM, this is significantly faster than swapping to a physical disk (which Crostini does inefficiently). It improves responsiveness when memory is running low.
        </p>
        
        <h3 className="text-xl font-bold text-gray-200 mt-6 mb-2">Step 1: Install zram-generator</h3>
        <p className="text-gray-400 mb-4">
          The <code className="bg-gray-700 px-1 rounded">zram-generator</code> package provides a service that automatically sets up ZRAM devices on boot according to a configuration file.
        </p>
        <CommandBlock content="sudo pacman -S zram-generator" />

        <h3 className="text-xl font-bold text-gray-200 mt-6 mb-2">Step 2: Create the Configuration File</h3>
        <p className="text-gray-400 mb-4">
          Create a configuration file to instruct <code className="bg-gray-700 px-1 rounded">zram-generator</code> on how to set up the swap space. First, open the file in a text editor:
        </p>
         <CommandBlock content="sudo nano /etc/systemd/zram-generator.conf" />
         <p className="text-gray-400 my-4">
          Then, paste the following content into the file. This configuration is a good starting point for a 4GB RAM system.
        </p>
        <CommandBlock content={zramConfigContent} />
      
        <h3 className="text-xl font-bold text-gray-200 mt-6 mb-2">Step 3: Apply the Configuration</h3>
        <p className="text-gray-400 mb-4">
          Reload the systemd daemon to make it aware of the new configuration, then restart the zram setup service to apply the changes immediately.
        </p>
        <CommandBlock content="sudo systemctl daemon-reload && sudo systemctl restart systemd-zram-setup@zram0.service" />
      
        <h3 className="text-xl font-bold text-gray-200 mt-6 mb-2">Step 4: Verify ZRAM is Active</h3>
        <p className="text-gray-400 mb-4">
          You can use two commands to confirm your compressed swap is working correctly. First, check the ZRAM device status:
        </p>
        <CommandBlock content="zramctl" />
         <p className="text-gray-400 my-4">
          The output should show a <code className="bg-gray-700 px-1 rounded">/dev/zram0</code> device with its size. Next, check the system's swap status:
        </p>
        <CommandBlock content="swapon --show" />
        <p className="text-gray-400 my-4">
          You should see <code className="bg-gray-700 px-1 rounded">/dev/zram0</code> listed as a swap device, confirming your setup is successful.
        </p>
      </div>

      <div className="border-t border-gray-700/50 pt-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Kernel Parameter Tuning (sysctl)</h2>
        <p className="text-gray-400 mb-4">
          You can tune the Linux kernel's behavior on the fly using <code className="bg-gray-700 px-1 rounded">sysctl</code>. This allows us to adjust memory management and other system parameters to favor responsiveness on a desktop system with low RAM.
        </p>
         <p className="bg-amber-900/50 text-amber-300 border border-amber-700/50 rounded-lg p-3 mb-4 text-sm">
          <strong>Important Note:</strong> Crostini runs in a virtual machine. While these settings are generally safe, ChromeOS may override or ignore some kernel parameters. The following are known to be effective and safe within this environment.
        </p>
        
        <h3 className="text-xl font-bold text-gray-200 mt-6 mb-2">Step 1: Create a sysctl Configuration File</h3>
        <p className="text-gray-400 mb-4">
          We will create a custom configuration file to ensure our settings are applied automatically on every boot. Open the file in a text editor:
        </p>
        <CommandBlock content="sudo nano /etc/sysctl.d/99-performance.conf" />
        
        <h3 className="text-xl font-bold text-gray-200 mt-6 mb-2">Step 2: Add Performance Parameters</h3>
        <p className="text-gray-400 mb-4">
         Paste the following content into the file. The comments explain what each parameter does.
        </p>
        <CommandBlock content={sysctlConfigContent} />

        <h3 className="text-xl font-bold text-gray-200 mt-6 mb-2">Step 3: Apply and Verify the Changes</h3>
        <p className="text-gray-400 mb-4">
          Apply the settings from all configuration files without needing to reboot:
        </p>
        <CommandBlock content="sudo sysctl --system" />
        <p className="text-gray-400 my-4">
          Now, verify that the new values have been applied. Check the new swappiness value (it should report '10'):
        </p>
        <CommandBlock content="sysctl vm.swappiness" />
      </div>
    </div>
  );
};