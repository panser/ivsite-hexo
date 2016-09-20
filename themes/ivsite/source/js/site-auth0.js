var lock = new Auth0Lock('9akDZGVintjekbwMaHKFdwHYpKfahkbr', 'panser.eu.auth0.com');

var btn_login = document.getElementById('btn-login');
btn_login.addEventListener('click', function() {
    lock.show();
});

lock.on("authenticated", function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) {
            // Handle error
            console.log("ERROR during auth0 auth")
            return;
        }
        localStorage.setItem('id_token', authResult.idToken);
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
};

retrieve_profile();


var btn_logout = document.getElementById('btn-logout');
var logout = function() {
    localStorage.removeItem('id_token');
    window.location.href = "/";
};
btn_logout.addEventListener('click', function() {
    logout();
});
