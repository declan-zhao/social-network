# Simple Social Network

This application is a simple social network using Node.js and MySQL.
The user interface is based on command line. And there are a couple of commands available to realize basic interactions on a social network.

## Getting Started

### Prerequisites

- `Node.js` with version >= 8.0 and `npm` with version >= 5.0, latest version recommended
- `MySQL` with version 8.0

#### Install Node.js

- The steps to install `Node.js` on macOS can be found in the link => [Install Node.js on macOS](https://nodejs.org/en/download/package-manager/#macos).
- The steps to install `Node.js` on Debian and Ubuntu based Linux distributions can be found in the link [Install Node.js on Debian/Ubuntu](https://github.com/nodesource/distributions/blob/master/README.md#deb).
- For other OS, follow this link => [Install Node.js](https://nodejs.org/en/download/current/). Windows is not recommended.

#### Check Node.js and npm

- Check if Node.js is installed and its version by using command `node -v`.
- Check if npm is installed and its version by using command `npm -v`.

#### Install MySQL

- The steps to install `MySQL 8.0` can be found in the link => [Install MySQL 8.0](https://dev.mysql.com/doc/refman/8.0/en/installing.html).

### Setup

- Ensure `MySQL` is running somewhere.
- Create database by sourcing `sn_204_G8.sql`. ([sample data](#sample-data) is provided in the SQL file and will be inserted)
- Ensure the working directory is the root directory of the project in which there is a file called `package.json`.
- Run `npm install` to restore the dependencies.
- Run `npm link` to link the package.
- Run `chmod +x sng8/sng8.js` to add permission.
- (**Important**) Replace `username`, `password`, `host`, `port` in `mysql-config.json` with yours.
- (**Important**) You probably need do following in `MySQL` if there is a connection issue.

    ```SQL
    ALTER USER '<your user>'@'localhost' IDENTIFIED BY '<your password>';
    ALTER USER '<your user>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<your password>';
    flush privileges;
    ```

## Use

### Functionalities

- A person can initial a post on a topic.
- A person can join a group with another person.
- A person can follow a topic.
- A person can determine what posts have been added by people and/or topics that they are following since they last read from those people/topics.
- A person can respond to a post with thumbs up and/or a response post.

### Main Command

- `sng8`, which stands for social network group 8

### Sub Commands

- `list` (alias: `ls`), list all entries in an entity table, such as Users -u, Posts -p, Topics -t or Groups -g
- `show`, show the relationship a user -u has, such as following users -f, following topics -t or joined groups -g
- `post` (alias: `po`), create a new post with author -u, topic -t and content -c, or respond to a read/own post with author -u, post ID -p and content -c
- `follow` (alias: `fo`), follow a user with user -u and following user -f, or follow a topic with user -u and topic -t, or join a group with user -u and group name -g
- `unfollow` (alias: `unfo`), unfollow a followed user with user -u and following user -f, or unfollow a followed topic with user -u and topic -t, or leave an joined group with user -u and group name -g
- `fetch` (alias: `fch`), fetch new posts from following user with user -u and following user -f, or fetch new posts from following topic with user -u and following topic -t
- `read`, read a specific post with user -u and post ID -p
- `like`, like a read/own post with user -u and post ID -p
- `unlike`, unlike a liked post with user -u and post ID -p
- `create`, create a new user with username -u, email -e, name -n and birth date -b

### Sample Usage

#### `list` (alias: `ls`)

list all entries in an entity table, such as Users -u, Posts -p, Topics -t or Groups -g

- `sng8 list -u`:
  - list all entries in `Users` table.

- `sng8 ls -p`:
  - list all entries in `Posts` table.

- `sng8 list -t`:
  - list all entries in `Topics` table.

- `sng8 ls -g`:
  - list all entries in `Groups` table.

#### `show`

show the relationship a user -u has, such as following users -f, following topics -t or joined groups -g

- `sng8 show -u 'user5' -f`:
  - show all the users that `user5` is following.
  - sample output:

    ```JSON
    -
    userId:    2
    userName:  user1
    email:     user1@sn.com
    name:      user1
    birthDate: Fri Aug 21 1981 00:00:00 GMT-0400 (Eastern Daylight Time)
    -
    ...
    ```

- `sng8 show -u 'user3' -t`:
  - show all the topics that `user3` is following.
  - sample output:

    ```JSON
    -
    topicId:   4
    topicName: Music
    -
    topicId:   5
    topicName: Fashion
    -
    topicId:   6
    topicName: Politics
    ```

- `sng8 show -u 'user3' -g`:
  - show all the groups that `user3` has joined.
  - sample output:

    ```JSON
    -
    groupId:   4
    groupName: Group 4
    createdBy: 3
    -
    groupId:   5
    groupName: Group 5
    createdBy: 3
    -
    ...
    ```

#### `post` (alias: `po`)

create a new post with author -u, topic -t and content -c, or respond to a read/own post with author -u, post ID -p and content -c

- `sng8 post -u 'user2' -t 'Business' -c 'This is a post.'`:
  - `user2` creates a new post on topic `Business` with content `This is a post.`.
  - sample output:

    ```JSON
    Post #7 has been successfully created!
    ```

- `sng8 post -u 'user5' -p 7 -c 'This is a response to an unread post.'`:
  - `user5` tries to respond an unread post #7 created by another user with content `This is a response to an unread post.`.
  - post not owned by user must be read before responding, see [read](#read--like--unlike) sample usage section below.
  - sample output:

    ```JSON
    User 'user5' has not read post #7 yet!
    ```

- `sng8 po -u 'user2' -p 7 -c 'This is a response.'`:
  - `user2` responds to a read/own post #7 with content `This is a response.`.
  - sample output:

    ```JSON
    Response #8 has been successfully created!
    ```

#### `follow` (alias: `fo`) / `unfollow` (alias: `unfo`)

follow/unfollow a user with user -u and following user -f, or follow/unfollow a topic with user -u and topic -t, or join/leave a group with user -u and group name -g

- `sng8 fo -u 'user1' -f 'user2'`:
  - `user1` follows user `user2`.
  - sample output:

    ```JSON
    User 'user1' has successfully followed user 'user2'!
    ```

- `sng8 unfo -u 'user1' -f 'user2'`:
  - `user1` unfollows user `user2`.
  - sample output:

    ```JSON
    User 'user1' has successfully unfollowed user 'user2'!
    ```

- `sng8 fo -u 'user1' -t 'Sports'`:
  - `user1` follows topic `Sports`.
  - sample output:

    ```JSON
    User 'user1' has successfully followed topic 'Sports'!
    ```

- `sng8 unfo -u 'user1' -t 'Sports'`:
  - `user1` unfollows topic `Sports`.
  - sample output:

    ```JSON
    User 'user1' has successfully unfollowed topic 'Sports'!
    ```

- `sng8 fo -u 'user4' -g 'Group 2'`:
  - `user4` joins group `Group 2`.
  - sample output:

    ```JSON
    User 'user4' has successfully joined group 'Group 2'!
    ```

- `sng8 unfo -u 'user4' -g 'Group 2'`:
  - `user4` leaves group `Group 2`.
  - sample output:

    ```JSON
    User 'user4' has successfully left group 'Group 2'!
    ```

#### `fetch` (alias: `fch`)

fetch new posts from following user with user -u and following user -f, or fetch new posts from following topic with user -u and following topic -t

- `sng8 fch -u 'user3' -f 'user2'`:
  - `user3` fetches new posts from following user `user2` and mark as read.
  - sample output:

    ```JSON
    -
    topicName:    Technology
    parentPostId: 1
    postId:       2
    type:         text
    content:      This is post #2. The delayed leisure consumes a lighted controller. The gang works a practical treasure. An upset consumer dashes behind the integrated predecessor. The upward voltage scores.
    likes:        2
    -
    ...
    ```

- `sng8 fch -u 'user2' -t 'Music'`:
  - `user2` fetches new posts from following topic `Music` and mark as read.
  - sample output:

    ```JSON
    -
    author:       user4
    parentPostId: 4
    postId:       5
    type:         text
    content:      This is post #5. A vocal boggles next to the unconvincing worship. Without the origin hopes the unifying collar. The attractive gateway captures the nest. His sales philosophy prosecutes. A bush results on top of a conference!
    likes:        2
    ```

#### `read` / `like` / `unlike`

read a specific post with user -u and post ID -p, like a read/own post with user -u and post ID -p, unlike a liked post with user -u and post ID -p

- `sng8 read -u 'user1' -p 8`:
  - `user1` reads post #8, mark the post as read if the reader is NOT author and the post has NOT been read.
  - sample output:

    ```JSON
    -
    author:       user2
    topicName:    Business
    parentPostId: 7
    postId:       8
    type:         text
    content:      This is a response.
    likes:        0
    ```

- `sng8 like -u 'user1' -p 8`:
  - `user1` likes post #8 if the user is author or the post has been read.
  - sample output:

    ```JSON
    User 'user1' has successfully liked post #8!
    ```

  - note: call `sng8 read -u 'user1' -p 8` again to see the increment of `likes`.

- `sng8 unlike -u 'user1' -p 8`:
  - `user1` unlikes post #8 if the post has been liked.
  - sample output:

    ```JSON
    User 'user1' has successfully unliked post #8!
    ```

  - note: call `sng8 read -u 'user1' -p 8` again to see the decrement of `likes`.

#### `create`

create a new user with username -u, email -e, name -n and birth date -b

- `sng8 create -u 'newuser' -e 'nu@sn.com' -n 'newuser' -b '1987/06/15'`:
  - create a new user with username `newuser`, email `nu@sn.com`, name `newuser` and birth date `1987/06/15`.
  - Notes:
    - `username` must be unique.
    - `email` must be unique and valid.
    - `birth date` must be valid.
  - sample output:

    ```JSON
    User 'newuser' has been successfully created!
    ```

## Limitation

- This application does not support creating new topic/group.
- This application does not support title for posts.
- This application does not support user authentication.

## Sample Data

- Available data in database:
  - existing users:

    ```JSON
    -
    userId:    1
    userName:  admin
    email:     admin@sn.com
    name:      admin
    birthDate: Sun Jul 20 1980 00:00:00 GMT-0400 (Eastern Daylight Time)
    -
    userId:    2
    userName:  user1
    email:     user1@sn.com
    name:      user1
    birthDate: Fri Aug 21 1981 00:00:00 GMT-0400 (Eastern Daylight Time)
    -
    userId:    3
    userName:  user2
    email:     user2@sn.com
    name:      user2
    birthDate: Wed Sep 22 1982 00:00:00 GMT-0400 (Eastern Daylight Time)
    -
    userId:    4
    userName:  user3
    email:     user3@sn.com
    name:      user3
    birthDate: Sun Oct 23 1983 00:00:00 GMT-0400 (Eastern Daylight Time)
    -
    userId:    5
    userName:  user4
    email:     user4@sn.com
    name:      user4
    birthDate: Sat Nov 24 1984 00:00:00 GMT-0500 (Eastern Standard Time)
    -
    userId:    6
    userName:  user5
    email:     user5@sn.com
    name:      user5
    birthDate: Wed Dec 25 1985 00:00:00 GMT-0500 (Eastern Standard Time)
    -
    userId:    7
    userName:  nu1
    email:     nu1@sn.com
    name:      newUser1
    birthDate: Sun Jan 26 1986 00:00:00 GMT-0500 (Eastern Standard Time)
    ```

  - existing posts:

    ```JSON
    -
    postId:  1
    content: This is post #1. The artist explodes in a slice. Near the platform waits the pleased well. The shirt beams the limb outside a hated constraint. A sector flowers after a competitive focus. A mystery hums opposite its populace.
    type:    text
    userId:  2
    -
    postId:  2
    content: This is post #2. The delayed leisure consumes a lighted controller. The gang works a practical treasure. An upset consumer dashes behind the integrated predecessor. The upward voltage scores.
    type:    text
    userId:  3
    -
    postId:  3
    content: This is post #3. The behind employer suffers next to the clothed cliff. The yeti rolls after a north. When can the displayed harden mature outside the anecdote? An indicator braves an adventure.
    type:    text
    userId:  4
    -
    postId:  4
    content: This is post #4. The psychologist puzzles? Does the diet stretch the lunatic? A dust returns around the enemy. The resigned mechanism hunts near the newest invalid. A constitutional knights the bitmap.
    type:    text
    userId:  4
    -
    postId:  5
    content: This is post #5. A vocal boggles next to the unconvincing worship. Without the origin hopes the unifying collar. The attractive gateway captures the nest. His sales philosophy prosecutes. A bush results on top of a conference!
    type:    text
    userId:  5
    -
    postId:  6
    content: This is post #6. How can a cash clog above the medium bath? A religious jet gowns the sentient. My priced fog mends. A neutral lisp promises the menu.
    type:    text
    userId:  5
    ```

  - available topics:

    ```JSON
    -
    topicId:   1
    topicName: Technology
    -
    topicId:   2
    topicName: Business
    -
    topicId:   3
    topicName: Sports
    -
    topicId:   4
    topicName: Music
    -
    topicId:   5
    topicName: Fashion
    -
    topicId:   6
    topicName: Politics
    ```

  - available groups:

    ```JSON
    -
    groupId:   1
    groupName: Group 1
    createdBy: 2
    -
    groupId:   2
    groupName: Group 2
    createdBy: 2
    -
    groupId:   3
    groupName: Group 3
    createdBy: 2
    -
    groupId:   4
    groupName: Group 4
    createdBy: 3
    -
    groupId:   5
    groupName: Group 5
    createdBy: 3
    -
    groupId:   6
    groupName: Group 6
    createdBy: 4
    ```
