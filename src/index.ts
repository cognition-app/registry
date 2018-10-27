import * as PouchDB from 'pouchdb-browser'
import * as PouchDBQuickSearch from 'pouchdb-quick-search'
import PluginSchema from '@cognition-app/schema/dist/core/plugin'
import RegistrySchema from '@cognition-app/schema/dist/core/plugin/registry'
import CognitionRegistrySchema from './schema/registry'
import { assertType } from '@cognition-app/schema/dist/assert'

const registry = (() => {
  // Setup full text search
  PouchDB.plugin(PouchDBQuickSearch)

  // Create memory pouch database to store registry
  const pouch = new PouchDB('@cognition-app/registry', { adapter: 'memory' }) as PouchDB.Database<PluginSchema>

  // Load registry
  const registry = assertType<CognitionRegistrySchema>(
    assertType<PluginSchema>(
      require('./package.json')
    ).cognition
  )

  // Store contents of registry into pouch
  for (const plugin of registry.items) {
    const pluginSchema = assertType<PluginSchema>(
      require(plugin + '/package.json')
    )
    pouch.put(pluginSchema)
  }

  // Return only the pouch
  return pouch
})()

export default async function CognitionRegistry(search: string): Promise<PouchDB.Query.Response<PluginSchema>> {
  const results = await registry.search({
    query: search,
    fields: [
      'name',
      'description',
    ],
    include_docs: true,
  })
  return results
}
