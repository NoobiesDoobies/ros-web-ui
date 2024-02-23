const Config = {
  ROSBRIDGE_SERVER_IP: "192.168.0.28",
  ROSBRIDGE_SERVER_PORT: "9090",
  RECONNECTION_TIMER: 3000,
  IMAGE_RAW_TOPIC: "/vision/color_mask",
  IMAGE_STREAM_SERVER_PORT: "8080",
  HSV_CONFIG_TOPIC: "/vision/color_mask/hsv_config",
  HSV_CONFIG_TOPIC_MESSAGE_TYPE: "std_msgs/Int32MultiArray",
  POSE_TOPIC: "amcl_pose",
  POSE_TOPIC_MESSAGE_TYPE: "geometry_msgs/PoseWithCovarianceStamped"
};

export default Config;
