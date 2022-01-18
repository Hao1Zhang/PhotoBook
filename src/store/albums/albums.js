import {API, graphqlOperation} from "aws-amplify";
import {createAlbum as createAlbumMutation} from "@/graphql/mutations";
import {getAlbum as getAlbumQuery} from "@/graphql/queries";
import {listAlbums as listAlbumsQuery} from "@/graphql/queries";



export const albumInfo = {
    namespaced: true,
    state: { 
        album: null,
    },
    mutations: {
        setAlbums(state, payload){
            state.album = payload;
        }
    },
    actions: {
        async createAlbum(_, newAlbum){
            try {
                await API.graphql(graphqlOperation(createAlbumMutation, {input: newAlbum}));
                return Promise.resolve("Success");
            } catch (e) {
                console.log(e);
                return Promise.reject(e);
            }
        },
        async getAlbum(_,albumId){
            return await API.graphql(graphqlOperation(getAlbumQuery, {id: albumId}));
        },
        async getAlbumsData({ commit}){
            const albumsData = await API.graphql(graphqlOperation(listAlbumsQuery))
            commit('setAlbums', albumsData.data.listAlbum.items);
        },
    },
    getters: {
        albums:(state) => state.albums
    }
}