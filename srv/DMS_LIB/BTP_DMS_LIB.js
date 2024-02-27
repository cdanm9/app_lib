const cds = require("@sap/cds");


module.exports = {

    _fetchJwtToken: async function () {
        let ConDMST = await cds.connect.to('BTP_DMS_Token');
        try {
            var params = "?grant_type=client_credentials";
            var path = encodeURI(params);
            const JToken = await ConDMST.send('POST', path);
            return JToken.access_token;
        } catch (error) {
            throw error;
        }
    },
    _CreateRepositorie: async function (in_externalId, in_description) {

        var body = {
            "repository": {
                "displayName": in_externalId,
                "description": in_description,
                "repositoryType": "internal",
                "isVersionEnabled": "true",
                "isVirusScanEnabled": "true",
                "isContentBridgeEnabled": "true",
                "externalId": in_externalId,
                "skipVirusScanForLargeFile": "true",
                "hashAlgorithms": "None"
            }
        };
        const lv_JWToken = await this._fetchJwtToken();
        try {
            let ConDMS = await cds.connect.to('BTP_DMS_Dest');
            var JToken = 'Bearer ' + lv_JWToken;
            const Resp = await ConDMS.send('POST', '/rest/v2/repositories', body, { 'Authorization': JToken });
            var dlist = Resp;
            if (dlist) {
                dlist.statusText = "Repository " + dlist.description + " Created Successfully";
            }
            var output = [];
            output.push(dlist);
            return output;
        } catch (error) {
            // error.message = error.reason.response.body.message;
            // var err = error.reason.response.body.message;
            error.reason.response.body.code=200;
            var err=error.reason.response.body
            return err;
        }
    },
    _GetRepositores: async function () {
        const lv_JWToken = await this._fetchJwtToken();
        try {
            let ConDMS = await cds.connect.to('BTP_DMS_Dest');
            var JToken = 'Bearer ' + lv_JWToken;
            const Resp = await ConDMS.send('GET', '/rest/v2/repositories', '', { 'Authorization': JToken });
            const StorageData = await ConDMS.send('GET', '/rest/v2/usage/storage', '', { 'Authorization': JToken });
            if (StorageData.usageListOfTenants[0].hasOwnProperty('perTenantStorageUsageList')) {
                var StorageDataRepoList = StorageData.usageListOfTenants[0].perTenantStorageUsageList.storageUsagePerRepository;
            }
            var output = [];
            var MainFolderlist = Resp.repoAndConnectionInfos;
            if (MainFolderlist) {
                var CheckArray = Array.isArray(MainFolderlist);
                if (CheckArray === true) {
                    MainFolderlist.forEach(function (MainFolderlistvalue) {
                        var item = {};
                        item.externalId = MainFolderlistvalue.repository.externalId;
                        item.id = MainFolderlistvalue.repository.id;
                        item.description = MainFolderlistvalue.repository.description;
                        item.repositorySubType = MainFolderlistvalue.repository.repositorySubType;
                        item.repositoryType = MainFolderlistvalue.repository.repositoryType;
                        item.cmisRepositoryId = MainFolderlistvalue.repository.cmisRepositoryId;
                        item.createdTime = MainFolderlistvalue.repository.createdTime;
                        var CheckArray_StorageDataRepoList = Array.isArray(StorageDataRepoList);
                        if (CheckArray_StorageDataRepoList === true) {
                            if (StorageDataRepoList !== undefined) {
                                StorageDataRepoList.forEach(function (StorageDataRepoListValue) {
                                    if (StorageDataRepoListValue.repositoryId === item.id)
                                        item.storage_metrics = StorageDataRepoListValue.metrics;
                                    item.storage_usage = StorageDataRepoListValue.usage;
                                });
                            }    
                        } else {
                            item.storage_metrics = StorageDataRepoList.metrics;
                            item.storage_usage = StorageDataRepoList.usage;
                        }                  
                        output.push(item);   
                    });
                } else {
                    var item = {};
                    item.externalId = MainFolderlist.repository.externalId;
                    item.id = MainFolderlist.repository.id;
                    item.description = MainFolderlist.repository.description;
                    item.repositorySubType = MainFolderlist.repository.repositorySubType;
                    item.repositoryType = MainFolderlist.repository.repositoryType;
                    item.cmisRepositoryId = MainFolderlist.repository.cmisRepositoryId;
                    item.createdTime = MainFolderlist.repository.createdTime;

                    var CheckArray_StorageDataRepoList = Array.isArray(StorageDataRepoList);
                    if (CheckArray_StorageDataRepoList === true) {
                        if (StorageDataRepoList !== undefined) {
                            StorageDataRepoList.forEach(function (StorageDataRepoListValue) {
                                if (StorageDataRepoListValue.repositoryId === item.id)
                                    item.storage_metrics = StorageDataRepoListValue.metrics;
                                item.storage_usage = StorageDataRepoListValue.usage;
                            });
                        }
                    } else {
                        item.storage_metrics = StorageDataRepoList.metrics;
                        item.storage_usage = StorageDataRepoList.usage;
                    }
                    output.push(item);
                }
                return output;
            } else {
                return "No Data Found!";
            }
        } catch (error) {
            // error.message = error.reason.response.body.message;
            error.message = error;
            throw (error)
        }
    },  
    _DeleteRepositore: async function (in_repo_id) {
        try {
            if (in_repo_id) {
                var path = '/rest/v2/repositories/' + in_repo_id;
                const lv_JWToken = await this._fetchJwtToken();
                let ConDMS = await cds.connect.to('BTP_DMS_Dest');
                var JToken = 'Bearer ' + lv_JWToken;
                const Resp = await ConDMS.send('DELETE', path, '', { 'Authorization': JToken });
                return Resp;
            } else {
                return "in_repo_id as input required for delete opration";
            }
        } catch (error) {
            var err = error.reason.response.body.message;
            return err;
        }
    },
    _createSubFolder: async function (rootFolderId, RepoID, forlderName) {

        try {
            const lv_JWToken = await this._fetchJwtToken();
            let ConDMS = await cds.connect.to('BTP_DMS_Dest');
            var path = 'browser/' + RepoID + '/root';
            var JToken = 'Bearer ' + lv_JWToken;

            const data =
                `objectId=${rootFolderId}` +
                `&cmisaction=createFolder` +
                `&propertyId[0]=cmis:name` +
                `&propertyValue[0]=${forlderName}` +
                `&propertyId[1]=cmis:objectTypeId` +
                `&propertyValue[1]=cmis:folder` +
                `&succinct='true'`;
            const headers = { "Content-Type": "application/x-www-form-urlencoded", "Authorization": JToken };


            const Resp = await ConDMS.send("POST", path, data, headers);
            return Resp;

        } catch (error) {
            var err = error.reason.response.body;
            return err;
        }

    },
    _getSubFolderItems: async function (RepoID, forlderName) {
        const lv_JWToken = await this._fetchJwtToken();
        try {
            let ConDMS = await cds.connect.to('BTP_DMS_Dest');
            var JToken = 'Bearer ' + lv_JWToken;
            const Resp = await ConDMS.send('GET', 'browser/' + RepoID + '/root/' + forlderName, '', { 'Authorization': JToken });
            var dlist = Resp.objects;
            var output = [];

            dlist.forEach(function (dlistvalue) {
                var item = {};
                item.objectId = dlistvalue.object.properties["cmis:objectId"].value;
                if (dlistvalue.object.properties.hasOwnProperty('sap:versionSeriesContentLength')) {
                    item.versionSeriesContentLength = dlistvalue.object.properties["sap:versionSeriesContentLength"].value;
                } else {
                    item.versionSeriesContentLength = '';
                }
                if (dlistvalue.object.properties.hasOwnProperty('cmis:versionLabel')) {
                    item.versionLabel = dlistvalue.object.properties["cmis:versionLabel"].value;
                } else {
                    item.versionLabel = '';
                }
                item.lastModifiedBy = dlistvalue.object.properties["cmis:lastModifiedBy"].value;
                if (dlistvalue.object.properties.hasOwnProperty('cmis:contentStreamId')) {
                    item.contentStreamId = dlistvalue.object.properties["cmis:contentStreamId"].value;
                } else {
                    item.contentStreamId = '';
                }
                item.objectTypeId = dlistvalue.object.properties["cmis:objectTypeId"].value;
                if (dlistvalue.object.properties.hasOwnProperty('cmis:contentStreamMimeType')) {
                    item.contentStreamMimeType = dlistvalue.object.properties["cmis:contentStreamMimeType"].value;
                } else {
                    item.contentStreamMimeType = '';
                }
                item.createdBy = dlistvalue.object.properties["cmis:createdBy"].value;
                item.baseTypeId = dlistvalue.object.properties["cmis:baseTypeId"].value;
                item.sap_owner = dlistvalue.object.properties["sap:owner"].value;
                item.creationDate = dlistvalue.object.properties["cmis:creationDate"].value;
                item.changeToken = dlistvalue.object.properties["cmis:changeToken"].value;
                if (dlistvalue.object.properties.hasOwnProperty('cmis:isVersionSeriesCheckedOut')) {
                    item.isVersionSeriesCheckedOut = dlistvalue.object.properties["cmis:isVersionSeriesCheckedOut"].value;
                } else {
                    item.isVersionSeriesCheckedOut = '';
                }
                if (dlistvalue.object.properties.hasOwnProperty('cmis:isMajorVersion')) {
                    item.isMajorVersion = dlistvalue.object.properties["cmis:isMajorVersion"].value;
                } else {
                    item.isMajorVersion = '';
                }
                item.name = dlistvalue.object.properties["cmis:name"].value;
                if (dlistvalue.object.properties.hasOwnProperty('cmis:isLatestVersion')) {
                    item.isLatestVersion = dlistvalue.object.properties["cmis:isLatestVersion"].value;
                } else {
                    item.isLatestVersion = '';
                }
                item.lastModificationDate = dlistvalue.object.properties["cmis:lastModificationDate"].value;
                if (dlistvalue.object.properties.hasOwnProperty('cmis:versionSeriesId')) {
                    item.versionSeriesId = dlistvalue.object.properties["cmis:versionSeriesId"].value;
                } else {
                    item.versionSeriesId = '';
                }
                if (dlistvalue.object.properties.hasOwnProperty('cmis:isLatestMajorVersion')) {
                    item.isLatestMajorVersion = dlistvalue.object.properties["cmis:isLatestMajorVersion"].value;
                } else {
                    item.isLatestMajorVersion = '';
                }
                if (dlistvalue.object.properties.hasOwnProperty('cmis:contentStreamLength')) {
                    item.contentStreamLength = dlistvalue.object.properties["cmis:contentStreamLength"].value;
                } else {
                    item.contentStreamLength = '';
                }
                output.push(item);
                console.log(output);
            });

            return output;
        } catch (error) {
            throw (error)
        }
    },
    _DeleteSubFolder: async function (FolderId, RepoID) {
        try {
            const lv_JWToken = await this._fetchJwtToken();
            let ConDMS = await cds.connect.to('BTP_DMS_Dest');
            var path = 'browser/' + RepoID + '/root';
            var JToken = 'Bearer ' + lv_JWToken;

            const data =
                `objectId=${FolderId}` +
                `&cmisaction=deleteTree` +
                `&continueOnFalure='true'`;
            const headers = { "Content-Type": "application/x-www-form-urlencoded", "Authorization": JToken };

            const Resp = await ConDMS.send("POST", path, data, headers);
            return Resp;
        } catch (error) {
            var restxt = {};
            restxt.status = error.reason.response.status;
            restxt.statusText = error.reason.response.statusText;
            if (restxt.status == 200) {
                restxt.statusText = "Folder/object Deleted Successfully";
            }

            return restxt;
        }
    },
    _RenameFolder: async function (ObjectId, RepoID, NewforlderName) {
        const lv_JWToken = await this._fetchJwtToken();
        let ConDMS = await cds.connect.to('BTP_DMS_Dest');
        var path = 'browser/' + RepoID + '/root';
        var JToken = 'Bearer ' + lv_JWToken;
        try {
            const data =
                `objectId=${ObjectId}` +
                `&cmisaction=update` +
                `&propertyId[0]=cmis:name` +
                `&propertyValue[0]=${NewforlderName}`;
            const headers = { "Content-Type": "application/x-www-form-urlencoded", "Authorization": JToken };
            const Resp = await ConDMS.send("POST", path, data, headers);
            var restxt = {};
            restxt.name = Resp.properties["cmis:name"].value;
            restxt.message = 'Object name changed Successfully';
            restxt.status = 200;
            return restxt;
        } catch (error) {
            var restxt = {};
            restxt.status = error.reason.response.status;
            restxt.statusText = error.reason.response.statusText;
            return restxt;
        }
    },
    _MoveObjectFTF: async function (ObjectId, RepoID, targetFolderId, sourceFolderId) {
        const lv_JWToken = await this._fetchJwtToken();
        let ConDMS = await cds.connect.to('BTP_DMS_Dest');
        var path = 'browser/' + RepoID + '/root';
        var JToken = 'Bearer ' + lv_JWToken;
        try {
            const data =
                `objectId=${ObjectId}` +
                `&cmisaction=move` +
                `&sourceFolderId=${sourceFolderId}` +
                `&targetFolderId=${targetFolderId}`;
            const headers = { "Content-Type": "application/x-www-form-urlencoded", "Authorization": JToken };
            const Resp = await ConDMS.send("POST", path, data, headers);
            var restxt = {};
            restxt.name = Resp.properties["cmis:name"].value;
            restxt.message = 'Object Moved Successfully';
            restxt.status = 201;
            return restxt;
        } catch (error) {
            var restxt = {};
            restxt.status = error.reason.response.status;
            restxt.statusText = error.reason.response.body.message;
            return restxt;
        }
    },
    _DeleteFile: async function (ObjectId, RepoID) {
        try {
            const lv_JWToken = await this._fetchJwtToken();
            let ConDMS = await cds.connect.to('BTP_DMS_Dest');
            var path = 'browser/' + RepoID + '/root';
            var JToken = 'Bearer ' + lv_JWToken;
            const data =
                `objectId=${ObjectId}` +
                `&cmisaction=delete` +
                `&continueOnFalure='true'`;
            const headers = { "Content-Type": "application/x-www-form-urlencoded", "Authorization": JToken };

            const Resp = await ConDMS.send("POST", path, data, headers);
            return Resp;
        } catch (error) {
            var restxt = {};
            restxt.status = error.reason.response.status;
            restxt.statusText = error.reason.response.statusText;
            if (restxt.status == 200) {
                restxt.statusText = "File/object Deleted Successfully";
            }
            return restxt;
        }
    },
    _DownloadFile: async function (ObjectID, RepoID) {
        const lv_JWToken = await this._fetchJwtToken();
        try {
          let ConDMS = await cds.connect.to('BTP_DMS_Dest');
          var JToken = 'Bearer ' + lv_JWToken;
          var path = 'browser/' + RepoID + '/root?objectId='+ ObjectID +'&=attachment';
          const Resp = await ConDMS.send('GET', path  , '', { 'Authorization': JToken }) ;
          return Resp; 
          
        } catch (error) {
          var restxt = {};
          restxt.status = error.reason.response.status;
          restxt.statusText = error.reason.response.body.message;
          throw restxt;
        }
      }
}