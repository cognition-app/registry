/// <reference types="pouchdb-core" />

declare namespace PouchDB {
  namespace Search {
    interface SearchRequest<Content extends {}> {
      /** Defines the query itself */
      query: string;

      /** Defines a list of fields that you want to receive. If omitted, you get the full documents. */
      fields: string[] | {
        [fieldName: string]: number
      };

      /** Whether or not to highlight the results */
      highlighting?: boolean

      /** Opening tag for result highlighting */
      highlighting_pre?: string

      /** Closing tag for result highlighting */
      highlighting_post?: string

      /** Whether or not to include docs in results */
      include_docs?: boolean

      /** Language(s) to use for Lunr */
      language?: string | string[]

      /** Minimum should match */
      mm?: string

      /** Whether or not to build the index */
      build?: boolean

      /** Whether or not to delete the index */
      destroy?: boolean

      /** When you want to make your queries stale */
      stale?: 'update_after' | 'ok'

      /** A filter function for results */
      filter?: (doc: Content) => boolean

      /** Maximum number of documents to return. */
      limit?: number;

      /** Number of docs to skip before returning. */
      skip?: number;
    }
  }
  interface Database<Content extends {}> {
    /** Perform a search through the database */
    search(request: Search.SearchRequest<Content>): Promise<PouchDB.Query.Response<Content>>
  }
}

declare module 'pouchdb-quick-search' {
  const plugin: PouchDB.Plugin;
  export = plugin;
}
