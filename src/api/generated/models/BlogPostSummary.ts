/* tslint:disable */
/* eslint-disable */
/**
 * Mario Kart Wii Players\' Page API
 * The brains of the Mario Kart Wii Players\' Page.
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './User';

/**
 * 
 * @export
 * @interface BlogPostSummary
 */
export interface BlogPostSummary {
    /**
     * 
     * @type {number}
     * @memberof BlogPostSummary
     */
    readonly id: number;
    /**
     * 
     * @type {User}
     * @memberof BlogPostSummary
     */
    author: User;
    /**
     * 
     * @type {string}
     * @memberof BlogPostSummary
     */
    title: string;
    /**
     * 
     * @type {number}
     * @memberof BlogPostSummary
     */
    publishedAt: number;
}

/**
 * Check if a given object implements the BlogPostSummary interface.
 */
export function instanceOfBlogPostSummary(value: object): value is BlogPostSummary {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('author' in value) || value['author'] === undefined) return false;
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('publishedAt' in value) || value['publishedAt'] === undefined) return false;
    return true;
}

export function BlogPostSummaryFromJSON(json: any): BlogPostSummary {
    return BlogPostSummaryFromJSONTyped(json, false);
}

export function BlogPostSummaryFromJSONTyped(json: any, ignoreDiscriminator: boolean): BlogPostSummary {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'author': UserFromJSON(json['author']),
        'title': json['title'],
        'publishedAt': json['published_at'],
    };
}

export function BlogPostSummaryToJSON(value?: Omit<BlogPostSummary, 'id'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'author': UserToJSON(value['author']),
        'title': value['title'],
        'published_at': value['publishedAt'],
    };
}

