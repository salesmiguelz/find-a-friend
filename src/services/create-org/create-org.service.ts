import { OrgsRepository } from "@/repositories/orgs-repository"
import { Org } from "@prisma/client"

interface CreateOrgRequest {
    name: string,
    email: string,
    password: string,
    managerName: string,
    phone: string,
    city_id: number,
    state_id: number
}

interface CreateOrgResponse {
    org: Org
}

export class CreateOrgService {
    constructor(private orgsRepository: OrgsRepository) { }

    async execute({ name, email, password, managerName, phone, city_id, state_id }: CreateOrgRequest): Promise<CreateOrgResponse> {
        const org = await this.orgsRepository.create({
            name,
            email,
            password,
            managerName,
            phone,
            city_id,
            state_id
        })

        return {
            org
        }
    }

}