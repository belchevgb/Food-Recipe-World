'use strict';

import {headers} from 'headers';
import {requester} from 'requester';
import {kinveyUrls} from 'kinvey-urls';

class UserModel {
    registerUser(data) {
        let headersToSend = headers.getKinveyHeaders(true, false);
        return requester.post(kinveyUrls.KINVEY_REGISTER_USER_URL, headersToSend, data);
    }

    loginUser(data) {
        let headersToSend = headers.getKinveyHeaders(true, false);
        return requester.post(kinveyUrls.KINVEY_LOGIN_USER_URL, headersToSend, data);
    }

    logoutUser() {
        let headersToSend = headers.getKinveyHeaders(false, true);
        return requester.post(kinveyUrls.KINVEY_LOGOUT_USER_URL, headersToSend);
    }

    findUser(data) {
        let headersToSend = headers.getKinveyHeaders(false, true),
            query = `?query={"username":"${data}"}`,
            url = `${kinveyUrls.KINVEY_USER_URL}${query}`;

        return requester.get(url, headersToSend);
    }

    getUserData(){
        let headersToSend = headers.getKinveyHeaders(false, true),
            url = kinveyUrls.KINVEY_USER_URL + '/' + localStorage.userId;

        return requester.get(url, headersToSend);
    }

    addRecipeToFavorites(recipe) {
        let headersToSend = headers.getKinveyHeaders(true, true),
            userUrl = `${kinveyUrls.KINVEY_USER_URL}/${localStorage.userId}`;

        return requester
            .get(userUrl, headersToSend)
            .then(response => {
                let oldRecipes = response.favoriteRecipes;

                oldRecipes.push(recipe);
                let updatedRecipes = {
                    "favoriteRecipes": oldRecipes,
                    "likedRecipes": response.likedRecipes
                };

                return requester.put(userUrl, headersToSend, updatedRecipes);
            });
    }

    removeRecipeFromFavorites(recipe) {
        let headersToSend = headers.getKinveyHeaders(true, true),
            userUrl = `${kinveyUrls.KINVEY_USER_URL}/${localStorage.userId}`;

        return requester
            .get(userUrl, headersToSend)
            .then(response => {
                let oldRecipes = response.favoriteRecipes;
                let indexToRemove = -1;
                let len = oldRecipes.length;

                for(let i = 0; i < len; i += 1) {
                    if (oldRecipes[i].id == recipe.id) {
                        indexToRemove = i;
                    }
                }
                //console.log(indexToRemove);
                if (indexToRemove > -1) {
                    oldRecipes.splice(indexToRemove, 1);
                    let updatedRecipes = {
                        "favoriteRecipes": oldRecipes,
                        "likedRecipes": response.likedRecipes
                    };

                    return requester.put(userUrl, headersToSend, updatedRecipes);
                }
                return;    
            });
    }

    addRecipeToLikes(recipe){
        let headersToSend = headers.getKinveyHeaders(true,true),
            userUrl = `${kinveyUrls.KINVEY_USER_URL}/${localStorage.userId}`;

        return requester
            .get(userUrl, headersToSend)
            .then(response => {
                let oldRecipes = response.likedRecipes;

                oldRecipes.push(recipe);

                let updatedRecipes = {
                    "likedRecipes" : oldRecipes,
                    "favoriteRecipes": response.favoriteRecipes
                };

                return requester.put(userUrl, headersToSend, updatedRecipes);
            });

    }

    getUserFavoriteRecipes() {
        let headersToSend = headers.getKinveyHeaders('false', true),
            userUrl = `${kinveyUrls.KINVEY_USER_URL}/${localStorage.userId}`;

        return requester.get(userUrl, headersToSend);
    }

    getUserLikedRecipes(){
        let headersToSend = headers.getKinveyHeaders('false' , true),
            userUrl = `${kinveyUrls.KINVEY_USER_URL}/${localStorage.userId}`;

        return requester.get(userUrl, headersToSend);
    }

    getFoundUserFavourites(userId) {
        let headersToSend = headers.getKinveyHeaders('false' , true),
            userUrl = `${kinveyUrls.KINVEY_USER_URL}/${userId}`;

        return requester.get(userUrl, headersToSend);
    }
}

let userModel = new UserModel();
export {userModel};