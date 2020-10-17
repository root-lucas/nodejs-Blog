/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : localhost:3306
 Source Schema         : myblog

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 17/10/2020 12:47:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blogs
-- ----------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createtime` bigint NOT NULL DEFAULT 0,
  `author` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of blogs
-- ----------------------------
INSERT INTO `blogs` VALUES (3, '标题C', '内容C', 1579853854877, 'zhangsan');
INSERT INTO `blogs` VALUES (5, '标题100', '内容100', 1580144834334, 'zhangsan');
INSERT INTO `blogs` VALUES (6, '标题A', '内容A', 1580144975260, 'zhangsan');
INSERT INTO `blogs` VALUES (7, '标题B', '内容B', 1583261879897, 'lisi');
INSERT INTO `blogs` VALUES (8, '标题A', '内容A', 1580657473049, 'lisi');
INSERT INTO `blogs` VALUES (9, '我是Koa2创建的', '我是由koa2创建的', 1581612041492, 'zhangsan');
INSERT INTO `blogs` VALUES (10, '我是通过postMan修改的', '我是通过postMan修改的内容', 1583000986217, 'lucas');
INSERT INTO `blogs` VALUES (30, '我是 test 创建的123', '我是test', 1583094319258, 'test');
INSERT INTO `blogs` VALUES (31, '12345', '12312', 1583167569108, 'test');
INSERT INTO `blogs` VALUES (56, '标题C', '内容C', 1585214601026, 'lisi');
INSERT INTO `blogs` VALUES (57, '标题1', '标题11', 1585215987742, 'zhangsan');
INSERT INTO `blogs` VALUES (58, 'Super', 'hello lucas', 1602907767582, 'zhangsan');
INSERT INTO `blogs` VALUES (59, 'hello', 'hello lucas', 1602907961874, 'lucas');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `realname` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'zhangsan', 'd259173f93388a05560db105a3f015ab', '张三');
INSERT INTO `users` VALUES (3, 'lucas', 'd259173f93388a05560db105a3f015ab', '许先生');
INSERT INTO `users` VALUES (4, 'test', '123', '李四李四李四');

SET FOREIGN_KEY_CHECKS = 1;
