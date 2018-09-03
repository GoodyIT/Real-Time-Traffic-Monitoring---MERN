# Host: localhost  (Version 5.5.5-10.1.34-MariaDB)
# Date: 2018-09-03 19:57:53
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "camera"
#

DROP TABLE IF EXISTS `camera`;
CREATE TABLE `camera` (
  `image1` varchar(1000) DEFAULT NULL,
  `image2` varchar(1000) DEFAULT NULL,
  `dateAdded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "camera"
#

INSERT INTO `camera` VALUES ('https://images.data.gov.sg/api/traffic-images/2018/09/2babe364-eb77-4afa-a21c-f8738ef1a7ad.jpg','https://images.data.gov.sg/api/traffic-images/2018/09/34e260ca-9028-43f4-b676-4f037eb1acaa.jpg','2018-09-03 19:35:00'),('https://images.data.gov.sg/api/traffic-images/2018/09/add5254a-0b41-4a34-bafe-1c2de1e693e4.jpg','https://images.data.gov.sg/api/traffic-images/2018/09/ccd9a172-62ba-4d9d-941b-40b8195e47e5.jpg','2018-09-03 19:40:00'),('https://images.data.gov.sg/api/traffic-images/2018/09/1ae091db-a742-44d6-82e2-f4e30ed846e0.jpg','https://images.data.gov.sg/api/traffic-images/2018/09/bb42ed9a-2f5c-4be4-a983-31b7644d132c.jpg','2018-09-03 19:45:00'),('https://images.data.gov.sg/api/traffic-images/2018/09/0b161e9b-a006-42ba-9343-309178e582dd.jpg','https://images.data.gov.sg/api/traffic-images/2018/09/696f82a7-a029-4155-97d8-5f6f58d8dc0c.jpg','2018-09-03 19:50:00'),('https://images.data.gov.sg/api/traffic-images/2018/09/3505682a-ee9d-44ae-932e-c59530bee252.jpg','https://images.data.gov.sg/api/traffic-images/2018/09/c9b874f6-0efb-411f-abcc-0a813954ca24.jpg','2018-09-03 19:55:00');

#
# Structure for table "traffic"
#

DROP TABLE IF EXISTS `traffic`;
CREATE TABLE `traffic` (
  `src` varchar(1000) DEFAULT NULL,
  `dst` varchar(1000) DEFAULT NULL,
  `duration` varchar(1000) DEFAULT NULL,
  `est` varchar(1000) DEFAULT NULL,
  `status` varchar(1000) DEFAULT NULL,
  `dateAdded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "traffic"
#

INSERT INTO `traffic` VALUES ('SG','MY','5 mins','7 mins','Normal Traffic','2018-09-03 19:29:31'),('SG','MY','5 mins','7 mins','Normal Traffic','2018-09-03 19:29:49'),('SG','MY','5 mins','7 mins','Normal Traffic','2018-09-03 19:35:00'),('SG','MY','5 mins','7 mins','Normal Traffic','2018-09-03 19:40:00'),('MY','SG','16 mins','30 mins','Heavy Traffic','2018-09-03 19:40:00'),('SG','MY','5 mins','7 mins','Normal Traffic','2018-09-03 19:45:00'),('MY','SG','16 mins','30 mins','Heavy Traffic','2018-09-03 19:45:00'),('SG','MY','5 mins','7 mins','Normal Traffic','2018-09-03 19:50:00'),('MY','SG','16 mins','27 mins','Heavy Traffic','2018-09-03 19:50:00'),('SG','MY','5 mins','7 mins','Normal Traffic','2018-09-03 19:55:00'),('MY','SG','16 mins','28 mins','Heavy Traffic','2018-09-03 19:55:00');

#
# Structure for table "weather"
#

DROP TABLE IF EXISTS `weather`;
CREATE TABLE `weather` (
  `summary` varchar(1000) DEFAULT NULL,
  `temperature` varchar(1000) DEFAULT NULL,
  `dateAdded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "weather"
#

INSERT INTO `weather` VALUES ('Humid and Mostly Cloudy','82.39','2018-09-03 19:40:01'),('Humid and Mostly Cloudy','81.87','2018-09-03 19:50:01'),('Humid and Mostly Cloudy','81.8','2018-09-03 19:55:01');
