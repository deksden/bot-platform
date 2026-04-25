export const CONTROL_PLANE_CAPABILITY_FAMILIES = [
  'workspace.read',
  'membership.read',
  'membership.manage',
  'session.read',
  'session.revoke',
  'product_instance.read',
  'product_instance.manage',
  'channel.read',
  'channel.manage',
  'pipeline_binding.manage',
  'policy_assignment.read',
  'policy_assignment.manage',
  'execution_run.read',
  'trace_artifact.read'
] as const;

export type KnownControlPlaneCapabilityFamily =
  (typeof CONTROL_PLANE_CAPABILITY_FAMILIES)[number];

export type ControlPlaneCapabilityFamily =
  | KnownControlPlaneCapabilityFamily
  | (string & {});
