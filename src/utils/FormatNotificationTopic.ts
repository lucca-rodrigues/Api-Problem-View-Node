export function FormatNotificationInteraction(stakeholder: any, ownerData: any, typeInteraction: string, problem: any, undo?: boolean): any {
    try {
        let obj = {
            "type": "interaction",
            "origin": 'api-views-problems.frstfalconi.com',
            "undo": !!undo,
            "owner": {
                "type": 'user',
                "attr": {
                    "id": ownerData?.id,
                    "name": ownerData?.name,
                    "avatar": ownerData?.avatar,
                    "email": ownerData?.email,
                    "organizations": ownerData?.organizations
                }
            },
            "stakeholders": [
                {
                    "type": 'user',
                    "attr": {
                        "id": stakeholder?.id,
                        "name": stakeholder?.name,
                        "avatar": stakeholder?.avatar,
                        "email": stakeholder?.email,
                        "organizations": stakeholder?.organizations
                    }
                }
            ],
            "attr": {
                "interaction": typeInteraction,
                "title": problem?.problemName,
                "language": ownerData?.language,
                "url": null,
                "challengeId": problem?.problemID,
            }
        }
        return obj
    } catch(err) {
        return {}
    }
}