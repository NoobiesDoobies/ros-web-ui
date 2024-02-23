How to run:
1. npm i
2. npm run start

nodes to install:
- usb_cam: sudo apt-get install ros-<distro>-usb-cam
- rosbridge: sudo apt-get install ros-<distro>-rosbridge-server
- web_video_server: sudo apt-get install ros-<distro>-web-video-server
- turtlebot3: https://emanual.robotis.com/docs/en/platform/turtlebot3/quick-start/
- tutlebot3_simulation: https://emanual.robotis.com/docs/en/platform/turtlebot3/simulation/
- riotu_pose_publisher: clone https://github.com/KRAI-ITB/riotu_robot_pose_publisher


nodes to run:
- rosrun usb_cam usb_cam_node
- roslaunch rosbridge_server rosbridge_websocket.launch address:=<your_ip_address>
- rosrun web_video_server web_video_server _address:=<your_ip_address> _port:=8080
- roslaunch turtlebot3_navigation turtlebot3_navigation.launch 
- roslaunch turtlebot3_gazebo turtlebot3_house.launch (wait for 5 mins, it would be installing the environment)
- rosrun riotu_robot_pose_publisher riotu_robot_pose_publisher 

