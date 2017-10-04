define([], function(){
    return {
        "workflowApiVersion": "1.0",
        "metaData": {
            "version": "2.0",
            "icon": "images/jb-icon.jpg",
            "iconSmall": "images/jb-icon.jpg"
        },
        "type": "REST",
        "lang": {
            "en-US": {
                "name": "Hello World Activity 2",
                "description": "Prueba descripción"
            }
        },
        "arguments": {
            "execute": {
                "inArguments":[
                    { "name":"{{Contact.Attribute.Sara-Data-Extension.FirstName}}"}
                    /*{ "lastName":"{{Contact.Attribute.Sara-Data-Extension.LastName}}"},
                    { "emailAddress": "{{Contact.Default.Email}}"}*/
                ],
                "outArguments": [
                    { "caseID":"number" }
                ],
                "url": "https://app-baz.herokuapp.com/ixn/activities/hello-world/execute/",
                "verb": "POST",
                "body": "",
                "header": "",
                "format": "json",
                "useJwt": false,
                "timeout": 10000
            }
        },
        "configurationArguments": {
            "applicationExtensionKey": "sr-hello-world-activity-srodriguez",
            "defaults": { "priority": "4"},
            "save": {
                "url": "https://app-baz.herokuapp.com/ixn/activities/hello-world/save/",
                "body": "",
                "verb": "POST",
                "useJwt": false
            },
            "publish": {
                "url": "https://app-baz.herokuapp.com/ixn/activities/hello-world/publish/",
                "verb": "POST",
                "body": "",
                "useJwt": false
            },
            "validate": {
                "url": "https://app-baz.herokuapp.com/ixn/activities/hello-world/validate/",
                "verb": "POST",
                "body": "",
                "useJwt": false
            }
        },
        "edit": {
            "url": "https://app-baz.herokuapp.com/ixn/activities/hello-world/",
            "height": 400,
            "width": 500
        }
    };
    /*return {
        "icon": "images/jb-icon.jpg",
        "iconSmall": "images/jb-icon.jpg",
        "key": "jbdev-ixn-api-v1-test-harness-activity",
        "partnerApiObjectTypeId": "IXN.CustomActivity.REST",
        "lang": {
            "en-US": {        
                "name": "Hello World Activity 2",
                "description": "Activity simply posts the data into an array for display on the App's home page."
            }
        },
        "category": "messaging",
        "version": "1.0",
        "apiVersion": "1.0",
        "execute": {
            "uri": "https://jb-ixn-v1-test.herokuapp.com/ixn/activities/hello-world/execute/",
			"inArguments": [],
			"outArguments": [],
            "verb": "POST",
			"body": "",
            "format": "json",
            "useJwt": false,
            "timeout": 3000
		},
        "save": {
            "uri": "https://jb-ixn-v1-test.herokuapp.com/ixn/activities/hello-world/save/",
			"verb": "POST",
			"body": "",
            "format": "json",
            "useJwt": false,
            "timeout": 3000
        },
        "publish": {
            "uri": "https://jb-ixn-v1-test.herokuapp.com/ixn/activities/hello-world/publish/",
            "verb": "POST",
			"body": "",
            "format": "json",
            "useJwt": false,
            "timeout": 3000
        },
        "validate": {
            "uri": "https://jb-ixn-v1-test.herokuapp.com/ixn/activities/hello-world/validate/",
            "verb": "POST",
			"body": "",
            "format": "json",
            "useJwt": false,
            "timeout": 3000
        },

        "edit": {
            "uri": "https://jb-ixn-v1-test.herokuapp.com/ixn/activities/hello-world/",
            "height": 400,
            "width": 500
        }
    };*/
});
