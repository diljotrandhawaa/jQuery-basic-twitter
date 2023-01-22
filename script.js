
$(document).ready(function($) {

  var users = [
    {
      userName: 'Diljot Randhawa',
      userMsg: 'Weather is good today',
      userImg: 'https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/Orange.png.webp'
    },
    {
      userName: 'Sharma',
      userMsg: 'Virat Kohli finally got married!!',
      userImg: 'https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/Blue.png.webp'
    },
    {
      userName: 'Jaskaran',
      userMsg: 'Paili ch khaad pai rahi hai',
      userImg: 'https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/Green.png.webp'
    },
  ];

  var usersProPics = ['https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/Yellow.png.webp', 'https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/Black.png.webp', 'https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/White.png.webp', 'https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/Brown.png.webp'];

  var hunUsers = [];

  var exisUsers = $.map(users, function(userObj) {
    return $(`<div class='user'>
    <table class="users-table">
      <tbody><tr>
        <td class="pro-img"><img src=${userObj.userImg}></td>
        <td class="user-name">${userObj.userName}</td>
        <td id="tweet-msg">${userObj.userMsg}</td>
      </tr></tbody>
    </table>
    <img class="msg-noClick" name="message" width="18" src="assets/images/message.png">
    <img class="heart-img" width="18" src="assets/images/heart.png" name="heart">
    <img class="retweet-img" width="18" src="assets/images/retweet.png" name="retweet">
    <img class="share-img" width="18" src="assets/images/share.png" name="share">
  <div>`);
  });

  $.each(exisUsers, function(index, user) {
    $(user).appendTo('.users-div');
  })

  $('.form-btn').on('click', function() {
    var userName = $('#user-name').val();
    var userMsg = $('#user-msg').val();

    if (userName.trim() === "") {
      return;
    }

    var newUser = {
      userName: userName,
      userMsg: userMsg
    };

    var userIsUnique = true;
    $.each(users, function(index, user) {
      if (user.userName === newUser.userName) {
        console.log(user.userName);
        newUser.userImg = user.userImg;
        users.push(newUser);
        userIsUnique = false;
      }
      console.log(user.userName);
    });

    if(userIsUnique === true) {
      newUser.userImg = usersProPics[usersProPics.length-1];
      usersProPics.pop();
      users.push(newUser);
    }

    console.log(users);
    hunUsers = $.map(users, function(userObj) {
      return $(`<div class='user'>
      <table>
        <tbody><tr>
          <td class="pro-img"><img src=${userObj.userImg}></td>
          <td class="user-name">${userObj.userName}</td>
          <td id="tweet-msg">${userObj.userMsg}</td>
        </tr></tbody>
      </table>
      <img class="msg-noClick" name="message" width="18" src="assets/images/message.png">
      <img class="heart-img" width="18" src="assets/images/heart.png" name="heart">
      <img class="retweet-img" width="18" src="assets/images/retweet.png" name="retweet">
      <img class="share-img" width="18" src="assets/images/share.png" name="share">
    <div>`);
    });

    console.log(hunUsers);

    $(hunUsers[hunUsers.length-1]).appendTo('.users-div');
  });

  var shuffleUsers = function(array) {
    var newArr = [];
    var duplArr = array.slice();
    var orignLength = array.length;
    while (newArr.length < orignLength) {
      var randomNum = Math.floor(Math.random() * duplArr.length);
      var randomEle = duplArr[randomNum];
      if (duplArr.includes(randomEle)) {
        newArr.push(randomEle);
        duplArr.splice(randomNum, 1);
      }
    }
    return newArr;
  };

  $('.random-btn').on('click', function() {
    console.log('update btn is working');
    if (hunUsers.length !== 0) {
      var randomUsers = shuffleUsers(hunUsers);
    } else {
      randomUsers = shuffleUsers(exisUsers);
    }
    $('.user').remove();
    $.each(randomUsers, function(index, user) {
      $(user).appendTo('.users-div');
    });
  });

  $('.users-div').on('click', '.user-name', function() {
    var filUserName = $(this).first().text();

    var filUsers = [];
    $.each(users, function(idx, user) {
      if (user.userName === filUserName) {
        filUsers.push(user);
      }
    });
    var filUsersToRender = $.map(filUsers, function(userObj) {
      return $(`<div class='user'>
      <table>
        <tbody><tr>
          <td class="pro-img"><img src=${userObj.userImg}></td>
          <td class="user-name">${userObj.userName}</td>
          <td id="tweet-msg">${userObj.userMsg}</td>
        </tr></tbody>
      </table>
      <img class="msg-noClick" name="message" width="18" src="assets/images/message.png">
      <img class="heart-img" width="18" src="assets/images/heart.png" name="heart">
      <img class="retweet-img" width="18" src="assets/images/retweet.png" name="retweet">
      <img class="share-img" width="18" src="assets/images/share.png" name="share">
      <div>`);
    });
    $('.user').remove();
    $.each(filUsersToRender, function(index, user) {
      $(user).appendTo('.users-div');
    });
    });

    function onHover(className) {
      $('.users-div').on('mouseenter', className, function() {
        $(this).attr('src', 'assets/images/' + $(this).attr('name') + '-filled.png');
      });
    }

    function offHover(className) {
      $('.users-div').on('mouseleave', className, function() {
        $(this).attr('src', 'assets/images/' + $(this).attr('name') + '.png');
      });
    }

    onHover('.heart-img');
    onHover('.msg-noClick');
    onHover('.retweet-img');
    onHover('.share-img');

    offHover('.heart-img');
    offHover('.msg-noClick');
    offHover('.retweet-img');
    offHover('.share-img');

    var clickCount = 0;

    function onClick(className1, className2, className3) {
      $('.users-div').on('click', className1, function(event) {
        clickCount++;
        if (clickCount % 2 !== 0) {
          $(this).off('mouseleave');
          $(this).parent().parent().off('mouseleave');
          offHover(className2);
          offHover(className3);
        } else {
          $(this).attr('src', 'assets/images/' + $(this).attr('name') + '.png');
          $(this).on('mouseleave', function() {
            $(this).attr('src', 'assets/images/' + $(this).attr('name') + '.png');
          });
        }
      })
    }

    onClick('.heart-img', '.msg-noClick', '.retweet-img', '.share-img');
    onClick('.msg-noClick', '.heart-img', '.retweet-img', '.share-img');
    onClick('.retweet-img', '.heart-img', '.msg-noClick', '.share-img');
    onClick('.share-img', '.retweet-img', '.heart-img', '.msg-noClick');

  });
