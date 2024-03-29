# webos_sample_schedule
This is webos_sample_schedule. Add schedule to calendar for test db8.


# Set up test environment
webos_sample_schedule tested using virtualbox emulator on linux ubuntu. 

  1. check your system
  > &nbsp;&nbsp;Ubuntu 16.04 LTS (Xenial Xerus) 64-bit  
  > &nbsp;&nbsp;Ubuntu 18.04 LTS (Bionic Beaver) 64-bit (Recommended)  
  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;check for detail on webosose document  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://www.webosose.org/docs/guides/setup/system-requirements/#build-system-requirements
    
  2. build webos-image  
    build webos-image follow by webosose document.  
    https://www.webosose.org/docs/guides/setup/building-webos-ose/
    
  3. install virtual box  
    install virtual box and set up your emulator.  
    https://www.webosose.org/docs/tools/sdk/emulator/emulator-user-guide/
  
  4. install webos cli  
    install cli  
    https://www.webosose.org/docs/tools/sdk/cli/cli-user-guide/#installing-cli
    
# Test
After set up environment test webos_sample_schedule
  
  1. Run your webos-emulator
  > :warning:
  > webos-emulator should run while doing test
    
  2. Clone webos_sample_schedule
  3. Open colsole and Move to webos_sample_schedule root directory
  4. Add your webos device  
  ```
      ares-setup-device
  ```
  5. Type follow command  
  ```
      ares-package .
      ares-install -d <your_device_name> -a com.schedule.app_0.0.1_all.ipk
      ares-launch -d <your_device_name> -a com.schedule.app
  ```
  
  6. Check your emulator
  ![screen](/img/calander.png)  
  
   &nbsp;   If you see this screen then success.  
   &nbsp;   click + button and add your scedule.
  
# More

  1. DB8  
    - if you are tring to find more infomations about db8 reference then check [this](https://www.webosose.org/docs/reference/ls2-api/com-webos-service-db/)  
    - If you are tring to make your own code with db8, Don't forget to add permission at appinfo.json  
    ```
    {
      "requiredPermissions": [
        "all",
        "database.internal",
        "database"
      ]
    }
    ```  
   
 2. check permission
    1. open console
    
    2. connect your device  
      ``` ssh -d <your_device_port> root@localhost```
      
    3. check permission (example db8)  
      ```ls-monitor -i com.webos.service.db```
 
 
