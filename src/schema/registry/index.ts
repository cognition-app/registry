import RegistrySchema from '@cognition-app/schema/dist/core/plugin/registry'

/**
 * Custom registry schema extension
 */
export default interface CognitionRegistrySchema<
  T extends string = 'https://raw.githubusercontent.com/cognition-app/registry/master/dist/schema/registry'
> extends RegistrySchema<T> {
  /**
   * Registry packages
   */
  items: string[]
}
