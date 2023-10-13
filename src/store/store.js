import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {userAuthSlice} from './slice/user';
import { adminAuthSlice } from "./slice/admin";
import { providerAuthSlice } from "./slice/provider";


    const UserPersistConfig = { key: "userAuth", storage, version: 1 };  
    const providerPersistedConfig = { key: "providerAuth", storage, version: 1 };
    const AdminPersistedConfig = { key: "adminAuth", storage, version: 1 };


    const userAuthPersistedReducer = persistReducer(UserPersistConfig,userAuthSlice.reducer);
    const providerAuthPersistedReducer = persistReducer(providerPersistedConfig,providerAuthSlice.reducer);
    const adminAuthPersistedReducer = persistReducer(AdminPersistedConfig, adminAuthSlice.reducer);
    


    export const store = configureStore({
        reducer :{
            user: userAuthPersistedReducer,
            provider: providerAuthPersistedReducer,
            admin: adminAuthPersistedReducer
            
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    });


    export const persistor = persistStore(store)


