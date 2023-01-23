
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

  var usersProPics = ['https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/Yellow.png.webp', 'https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/Black.png.webp', 'https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/White.png.webp', 'https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/Brown.png.webp', 'https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/Rose.png.webp', 'https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/Banana.png.webp', 'https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/Gray.png.webp', 'https://borderpolar.b-cdn.net/wp-content/uploads/2021/07/Tan.png.webp'];

  function renderUsers(usersArray) {
    $('.user').remove();
    var usersToRender = $.map(usersArray, function(userObj) {
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
      <button class="add-friend" type="button">Add Friend</button>
      <button class="remove-friend" type="button">Unfriend</button>
    <div>`);
    });
    $.each(usersToRender, function(index, user) {
      $(user).appendTo('.users-div');
    });
  }

  function filteredUsers(userName) {
    var filUsers = [];
    $.each(users, function(idx, user) {
      if (user.userName === userName) {
        filUsers.push(user);
      }
    });
    return filUsers;
  }

  var friends = [];

  function addFriend(friendName) {
    var newFriend = $(`<div class="friends no-show">
    @ <a src="#">${friendName}</a>
    </div>`);
    $(newFriend).prependTo('.add-friends');
  }


  var hunUsers = [];

  renderUsers(users);

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
    for(var i = 0; i < users.length; i++) {
      if (users[i]['userName'] === newUser.userName) {
        newUser.userImg = users[i].userImg;
        users.unshift(newUser);
        userIsUnique = false;
        i = users.length + 1;
      }
    };

    if(userIsUnique === true) {
      newUser.userImg = usersProPics[usersProPics.length-1];
      usersProPics.pop();
      users.unshift(newUser);
    }

    renderUsers(users);

    $('#user-name').val('');
    $('#user-msg').val('');
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
    if($(this).text() === 'Back') {
      $(this).text('Update Feed');
      renderUsers(users);
    } else {
      $(this).text('Back');
      renderUsers(shuffleUsers(users));
    }
  });

  $('.users-div').on('click', '.user-name', function() {
    var filUserName = $(this).first().text();

    $('.random-btn').text('Back');

    renderUsers(filteredUsers(filUserName));
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

    $('.friends-list').on('click', function() {
      var errorMsg = $(`<div class="error-msg">Add New Friends</div>`);
      if ($(this).text() === 'Hide Friends') {
        $('.error-msg').remove();
        $(this).text('Show Friends');
      } else {
        if(!$(this).parent().find('.friends').length) {
          $(errorMsg).css({'textDecoration': 'none', 'cursor': 'text'});
          $(errorMsg).appendTo('.add-friends');
        } else {
          $('.error-msg').remove();
        }
        $(this).text('Hide Friends');
      }
      $('.friends').toggleClass('no-show');
    });

    $('.friends').on('click', function() {
      var clickedUser = $(this).text().slice(2);
      var clickedUsers = [];
      $('.random-btn').text('Back');
      renderUsers(filteredUsers(clickedUser));
    });

    $('.users-div').on('click', '.add-friend', function() {
      var user = $(this).parent().find('.user-name').text();
      if(!friends.includes(user)) {
        friends.push(user);
        $('.friends-list').text('Show Friends');
        $('.error-msg').remove();
        $('.friends').remove();
        $.each(friends, function(index, friend) {
          addFriend(friend);
        });
        $('.friends-list').addClass('friend-added');
        setTimeout(function() {
          $('.friends-list').removeClass('friend-added');
        }, 50);
        $(this).css('right', '90px');
        $(this).next().css('display', 'inline-block');
      }
      if (friends.includes(user)) {
        $(this).html("<span>Friends</span> <img class='check-img' src='assets/images/check.png'>");
      }
    });

    $('.users-div').on('click', '.remove-friend', function() {
      var userToRemove = $(this).parent().find('.user-name').text();
      if (friends.includes(userToRemove)) {
        friends.splice(friends.indexOf(userToRemove), 1);
        $(`.friends:contains(${userToRemove})`).remove();
        $(this).css('display', 'none');
        $(this).prev().css('right', '30px');
        $(this).prev().text('Add Friend');
      }
    });

  });
