interface User {
    id: string;
    name: string;
    avatar: string;
    email: string;
    organizations?: string[];
    language?: string;
}

interface Problem {
    problemName: string;
    problemID: string;
    views?: number
}

interface InputObject {
    problemId: string;
    idFirstViewer: string;
    firstViewer: string;
    description: string;
    views: number;
    avatarUrl: string;
    owner: {
        id: string;
        userName: string;
        avatarUrl: string;
        email: string;
        createdAt?: string;
        updatedAt?: string;
        deletedAt?: string | null;
    };
}

interface InputObjectNotView {
    problemId: string;
    description: string;
    owner: {
        id: string;
        userName: string;
        avatarUrl: string;
        email: string;
        createdAt?: string;
        updatedAt?: string;
        deletedAt?: string | null;
    };
}

export class NotificationInteraction {
    stakeholder: User;
    ownerData: User;
    typeInteraction: string;
    problem: Problem;
    undo: boolean;

    constructor(stakeholder: User, ownerData: User, typeInteraction: string, problem: Problem, undo?: boolean) {
        this.stakeholder = stakeholder;
        this.ownerData = ownerData;
        this.typeInteraction = typeInteraction;
        this.problem = problem;
        this.undo = !!undo;
    }

    format(): any {
        try {
            let obj = {
                "type": "interaction",
                "origin": 'api-views-problems.frstfalconi.cloud',
                "undo": this.undo,
                "owner": {
                    "type": 'user',
                    "attr": {
                        "id": this.ownerData?.id,
                        "name": this.ownerData?.name,
                        "avatar": this.ownerData?.avatar,
                        "email": this.ownerData?.email,
                        "organizations": this.ownerData?.organizations
                    }
                },
                "stakeholders": [
                    {
                        "type": 'user',
                        "attr": {
                            "id": this.stakeholder?.id,
                            "name": this.stakeholder?.name,
                            "avatar": this.stakeholder?.avatar,
                            "email": this.stakeholder?.email,
                            "organizations": this.stakeholder?.organizations
                        }
                    }
                ],
                "attr": {
                    "interaction": this.typeInteraction,
                    "title": this.problem?.problemName,
                    "language": this.ownerData?.language,
                    "url": null,
                    "challengeId": this.problem?.problemID,
                    "totalViews": this.problem?.views
                }
            }
            return obj
        } catch(err) {
            return {}
        }
    }

    static createFromObjectView(inputObj: InputObject): NotificationInteraction {
        const ownerData: User = {
            id: `frst-company-id-${inputObj?.idFirstViewer}`,
            name: inputObj?.firstViewer,
            avatar: inputObj?.avatarUrl,
            email: 'frst-notification',
            organizations: []
        };

        const stakeholder: User = {
            id: inputObj?.owner?.id,
            name: inputObj?.owner?.userName,
            avatar: inputObj?.owner?.avatarUrl,
            email: inputObj?.owner?.email,
            organizations: []
        };

        const typeInteraction = 'view-challenge';

        const problem: Problem = {
            problemName: inputObj?.description,
            problemID: inputObj?.problemId,
            views: inputObj.views
        };

        return new NotificationInteraction(stakeholder, ownerData, typeInteraction, problem);
    }

    static createFromObjectNotView(inputObj: InputObjectNotView): NotificationInteraction {

        const ownerData: User = {
            id: 'frst-company-id-00',
            name: 'FRST Falconi',
            avatar: 'https://i.gyazo.com/3a59a7139631b386a8043095b207949c.png',
            email: 'frst-notification',
            language: 'pt-BR',
            organizations: []
        };

        const stakeholder: User = {
            id: inputObj?.owner?.id,
            name: inputObj?.owner?.userName,
            avatar: inputObj?.owner?.avatarUrl,
            email: inputObj?.owner?.email,
            organizations: []
        };

        const typeInteraction = 'challenge-without-view';

        const problem: Problem = {
            problemName: inputObj?.description,
            problemID: inputObj?.problemId,
        };

        return new NotificationInteraction(stakeholder, ownerData, typeInteraction, problem);
    }
}