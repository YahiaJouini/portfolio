import { getPayload, Payload } from "payload"
import config from "@payload-config"

export class Orm {
   private static payloadInstance: Payload | null = null

   public static async getPayloadInstance(): Promise<Payload> {
      if (!this.payloadInstance) {
         this.payloadInstance = await getPayload({ config })
      }
      return this.payloadInstance
   }
}
