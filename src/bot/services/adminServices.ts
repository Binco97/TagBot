import { Group } from '../../entity/Group';
import { Tag } from '../../entity/Tag';

export async function createTag(groupId: number, tagName: string) {

	try {
		//get the group from the database using ctx.update.message.chat.id
		const group = await Group.findOne({where: {groupId: groupId}}); 

		let tag = new Tag();
        tag.name = tagName;
        tag.group = group;
        tag = await tag.save();
        return { state: 'ok', message: null };

	}
	catch(error) {
		const response =
            error.code == 'ER_DUP_ENTRY'
                ? { state: 'error', message: 'This tag already exists' }
                : { state: 'error', message: 'An error occured' };
        return response;
	}
	
}

export async function deleteTag(groupId: number, tagName: string) {
	
	try {
		//get the tag from the database
		const tag = await Tag.findOne({where: {name: tagName, group: {groupId: groupId}}});

		//if the tag doesn't exist, return an error
		if(!tag) {
			return {state: "error", message: "This tag doesn't exist"};
		}

		//delete the tag
		await tag.remove();
		return {state: "ok", message: null};
	}
	catch(error) {
		console.log(error);
		return {state: "error", message: "An error occured"};
	}
}

export async function renameTag(groupId: number, tagName: string, newTagName: string) {

	try {
		//get the tag from the database
		const tag = await Tag.findOne({where: {name: tagName, group: {groupId: groupId}}});

		//if the tag doesn't exist, return an error
		if(!tag) {
			return {state: "error", message: "This tag doesn't exist"};
		}

		//rename the tag
		tag.name = newTagName;
		await tag.save();
		return {state: "ok", message: null};
	}
	catch(error) {
		console.log(error);
		return {state: "error", message: "An error occured"};
	}
}

export async function getAdminGroups(userId: number) {
	try {
		const groups = await Group.find({ relations: ["admins"], where: { admins: {userId: userId} } });

		return {state: "ok", payload: groups};
	}
	catch(error) {
		console.log(error);
		return {state: "error", message: "An error occured"};
	}
	
}