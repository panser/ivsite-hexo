var lock = new Auth0Lock('SLaOAbGM0BzlcozfVoqDYuZJXKlIj19G', 'panser.auth0.com', {
    theme: {
        // logo: "/img/iv-logo.png",
        // primaryColor: 'green'
    },
    languageDictionary: {
        // emailInputPlaceholder: "something@youremail.com",
        title: "Gostroy",
    },
    auth: {
        redirectUrl: 'http://localhost:4000/',
        responseType: 'token',
        authParams: {
            // state: '/',
            scope: 'openid profile'
        }
    }
});

var btn_login = document.getElementById('btn-login');
var btn_logout = document.getElementById('btn-logout');

btn_login.addEventListener('click', function() {
    lock.show({
        language: "ru"
    });
});

lock.on("authenticated", function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) {
            // Handle error
            console.log("ERROR during auth0 `lock.getProfile`")
            return;
        }
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("profile", JSON.stringify(profile));
        // Display user information
        show_profile_info(profile);
    });
});


var retrieve_profile = function() {
    var id_token = localStorage.getItem('id_token');
    if (id_token) {
        lock.getProfile(id_token, function (err, profile) {
            if (err) {
                return alert('There was an error getting the profile: ' + err.message);
            }
            // Display user information
            show_profile_info(profile);
        });
    }
};

var show_profile_info = function(profile) {
    var avatar = document.getElementById('avatar');
    document.getElementById('nickname').textContent = profile.nickname;
    btn_login.style.display = "none";
    avatar.src = profile.picture;
    avatar.style.display = "block";
    btn_logout.style.display = "block";

    var dropdownDivLogout = document.getElementById('dropdown-div-logout');
    dropdownDivLogout.style.display = "block";
};


var logout = function() {
    localStorage.removeItem('id_token');
    window.location.href = "/";
};
btn_logout.addEventListener('click', function() {
    logout();
});


retrieve_profile();
